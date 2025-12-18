from django.shortcuts import render, get_object_or_404
from django.http import FileResponse, HttpResponse
from rest_framework import generics, permissions
from .models import TalentProfile
from .serializers import TalentProfileSerializer

# 1. VIEW PUBLIK: Melihat Daftar Semua Talent
class PublicTalentListView(generics.ListAPIView):
    # Hanya tampilkan yang 'is_open_to_work' True (Opsional, sesuai logika kamu)
    queryset = TalentProfile.objects.all().order_by('-updated_at')
    serializer_class = TalentProfileSerializer
    permission_classes = [permissions.AllowAny] # PENTING: Public boleh akses tanpa login
    
    # Fitur Search (Bonus)
    # Nanti bisa ditambah filter/search backend di sini

# 1.5. VIEW PUBLIK: Melihat 5 Talent Terbaru untuk Homepage
class LatestTalentListView(generics.ListAPIView):
    """
    Endpoint untuk menampilkan 5 talent terbaru di homepage
    Akses: /api/talents/latest/
    """
    queryset = TalentProfile.objects.all().order_by('-created_at')[:5]
    serializer_class = TalentProfileSerializer
    permission_classes = [permissions.AllowAny]

# 2. VIEW PUBLIK: Melihat Detail Satu Talent berdasarkan Username
class PublicTalentDetailView(generics.RetrieveAPIView):
    queryset = TalentProfile.objects.all()
    serializer_class = TalentProfileSerializer
    permission_classes = [permissions.AllowAny] # Public boleh akses
    lookup_field = 'user__username' # URL nanti pakai username (misal: /talents/afrizal/)

# 3. VIEW PRIVATE: Edit Profil Sendiri (Dashboard)
class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = TalentProfileSerializer
    permission_classes = [permissions.IsAuthenticated] # WAJIB LOGIN

    def get_object(self):
        # Fungsi ini memastikan user hanya mengedit profil miliknya sendiri
        # Jika profil belum ada, otomatis dibuatkan (get_or_create)
        obj, created = TalentProfile.objects.get_or_create(user=self.request.user)
        return obj

# 4. VIEW PUBLIK: Download CV PDF
class DownloadCVView(generics.RetrieveAPIView):
    """
    Endpoint untuk download CV dari talent profile
    Akses: /api/talents/<username>/download-cv/
    """
    queryset = TalentProfile.objects.all()
    permission_classes = [permissions.AllowAny]
    lookup_field = 'user__username'
    
    def get(self, request, *args, **kwargs):
        profile = self.get_object()
        
        # Jika tidak ada file CV
        if not profile.cv_file:
            return HttpResponse(
                "CV tidak tersedia", 
                status=404
            )
        
        # Ambil file CV
        cv_file = profile.cv_file
        response = FileResponse(cv_file.open('rb'), as_attachment=True)
        response['Content-Disposition'] = f'attachment; filename="CV_{profile.user.username}.pdf"'
        return response