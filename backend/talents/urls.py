from django.urls import path
from .views import PublicTalentListView, PublicTalentDetailView, MyProfileView

urlpatterns = [
    # 1. URL untuk melihat semua talent (Public)
    # Akses: /api/talents/
    path('', PublicTalentListView.as_view(), name='talent-list'),

    # 2. URL untuk edit profil sendiri (Private - Harus Login)
    # Akses: /api/talents/me/
    path('me/', MyProfileView.as_view(), name='my-profile'),

    # 3. URL untuk melihat detail talent berdasarkan username (Public)
    # Akses: /api/talents/afrizal/
    path('<str:user__username>/', PublicTalentDetailView.as_view(), name='talent-detail'),
]