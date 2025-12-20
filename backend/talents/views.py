from django.shortcuts import render, get_object_or_404
from django.http import FileResponse, HttpResponse
from django.contrib.auth import get_user_model
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions, viewsets
from rest_framework import filters
from django_filters import rest_framework as django_filters
from authentication.permission import IsAdminUser
from .models import TalentProfile, Skill, Experience, Portfolio
from .serializers import TalentProfileSerializer, SkillSerializer, ExperienceSerializer, PortfolioSerializer, AdminDashboardStatsSerializer, AdminTalentSerializer, HomePageStatsSerializer

User = get_user_model()

class TalentProfileFilter(django_filters.FilterSet):
    prodi = django_filters.CharFilter(lookup_expr='icontains')
    skill = django_filters.CharFilter(method='filter_by_skill')
    
    class Meta:
        model = TalentProfile
        fields = ['prodi', 'skill']
    
    def filter_by_skill(self, queryset, name, value):
        return queryset.filter(user__skills__skill_name__icontains=value).distinct()


class PublicTalentListView(generics.ListAPIView):
    queryset = TalentProfile.objects.all().order_by('-updated_at')
    serializer_class = TalentProfileSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [django_filters.DjangoFilterBackend, filters.SearchFilter]
    filterset_class = TalentProfileFilter
    search_fields = ['user__username', 'user__first_name', 'user__last_name']

class LatestTalentListView(generics.ListAPIView):
    queryset = TalentProfile.objects.all().order_by('-created_at')[:5]
    serializer_class = TalentProfileSerializer
    permission_classes = [permissions.AllowAny]

class PublicTalentDetailView(generics.RetrieveAPIView):
    queryset = TalentProfile.objects.all()
    serializer_class = TalentProfileSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'user__username'

class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = TalentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj, created = TalentProfile.objects.get_or_create(user=self.request.user)
        return obj

class DownloadCVView(generics.RetrieveAPIView):
    queryset = TalentProfile.objects.all()
    permission_classes = [permissions.AllowAny]
    lookup_field = 'user__username'
    
    def get(self, request, *args, **kwargs):
        profile = self.get_object()
        
        if not profile.cv_file:
            return HttpResponse("CV tidak tersedia", status=404)
        
        cv_file = profile.cv_file
        response = FileResponse(cv_file.open('rb'), as_attachment=True)
        response['Content-Disposition'] = f'attachment; filename="CV_{profile.user.username}.pdf"'
        return response


class SkillViewSet(viewsets.ModelViewSet):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Skill.objects.filter(user=self.request.user).order_by('-id')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Experience.objects.filter(user=self.request.user).order_by('-start_date')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PortfolioViewSet(viewsets.ModelViewSet):
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Portfolio.objects.filter(user=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AdminTalentListView(generics.ListAPIView):
    """
    Admin endpoint untuk melihat daftar semua mahasiswa/talent
    Akses: /api/admin/talents/
    """
    serializer_class = AdminTalentSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return (
            User.objects
            .filter(role="student")
            .select_related("profile")
            .prefetch_related("skills")
            .order_by('-id')
        )

class AdminDashboardStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_student = User.objects.filter(role="student").count()
        active_profiles = User.objects.filter(role="student", is_active=True).count()
        inactive_profiles = User.objects.filter(role="student", is_active=False).count()
        total_skills = Skill.objects.values("skill_name").distinct().count()

        top_prodi_row = (
            TalentProfile.objects
            .values("prodi")
            .annotate(total=Count("id"))
            .order_by("-total")
            .first()
        )

        top_prodi = {
            "name": top_prodi_row["prodi"] if top_prodi_row else "N/A",
            "total": top_prodi_row["total"] if top_prodi_row else 0,
        }

        total_experiences = Experience.objects.filter(user__role="student").count()
        avg_experience = round(total_experiences / total_student, 2) if total_student > 0 else 0.0

        data = {
            "total_student": total_student,
            "active_profiles": active_profiles,
            "inactive_profiles": inactive_profiles,
            "total_skills": total_skills,
            "top_prodi": top_prodi,
            "avg_experience": avg_experience,
        }

        serializer = AdminDashboardStatsSerializer(data)
        return Response(serializer.data)
    
class AdminToggleUserStatusView(APIView):
    """
    Admin endpoint untuk activate/deactivate user
    Akses: /api/talents/admin/users/<id>/toggle-status/
    """
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            user = User.objects.get(pk=pk, role="student")
            # Toggle status
            user.is_active = not user.is_active
            user.save()
            
            return Response({
                "message": f"User {'activated' if user.is_active else 'deactivated'} successfully",
                "is_active": user.is_active
            })
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=404
            )


class AdminUpdateUserView(generics.UpdateAPIView):
    """
    Admin endpoint untuk update user profile
    Akses: /api/talents/admin/users/<id>/
    """
    serializer_class = AdminTalentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.filter(role="student")
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Update user data
        if 'email' in request.data:
            instance.email = request.data['email']
        if 'nim' in request.data:
            instance.nim = request.data['nim']
            
        # Update profile data if exists
        if hasattr(instance, 'profile'):
            profile = instance.profile
            if 'program_studi' in request.data:
                profile.prodi = request.data['program_studi']
                profile.save()
        
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
class HomePageStatsView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        # Total mahasiswa (hanya user dengan role "student")
        total_student = User.objects.filter(role="student").count()

        # Total unique skills
        total_skills = Skill.objects.values("skill_name").distinct().count()

        # Total program studi (jumlah prodi unik)
        total_prodi = (
            TalentProfile.objects
            .exclude(prodi__isnull=True)
            .exclude(prodi__exact="")
            .values("prodi")
            .distinct()
            .count()
        )

        # Kunci-kunci disesuaikan dengan frontend types
        data = {
            "total_student": total_student,
            "total_skills": total_skills,
            "total_prodi": total_prodi,
        }

        # Serialisasi output
        serializer = HomePageStatsSerializer(data)
        return Response(serializer.data)