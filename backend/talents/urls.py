from django.urls import path
from .views import PublicTalentListView, PublicTalentDetailView, MyProfileView, DownloadCVView, LatestTalentListView

urlpatterns = [
    # 1. URL untuk melihat semua talent (Public)
    # Akses: /api/talents/
    path('', PublicTalentListView.as_view(), name='talent-list'),

    # 1.5. URL untuk melihat 5 talent terbaru (Public)
    # Akses: /api/talents/latest/
    path('latest/', LatestTalentListView.as_view(), name='latest-talents'),

    # 2. URL untuk edit profil sendiri (Private - Harus Login)
    # Akses: /api/talents/me/
    path('me/', MyProfileView.as_view(), name='my-profile'),

    # 4. URL untuk download CV (Public)
    # Akses: /api/talents/<username>/download-cv/
    path('<str:user__username>/download-cv/', DownloadCVView.as_view(), name='download-cv'),

    # 3. URL untuk melihat detail talent berdasarkan username (Public)
    # Akses: /api/talents/afrizal/
    path('<str:user__username>/', PublicTalentDetailView.as_view(), name='talent-detail'),
]