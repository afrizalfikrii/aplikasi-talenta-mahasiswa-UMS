from django.shortcuts import render
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