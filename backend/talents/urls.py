from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PublicTalentListView, 
    PublicTalentDetailView, 
    MyProfileView, 
    DownloadCVView, 
    LatestTalentListView,
    SkillViewSet,
    ExperienceViewSet,
    PortfolioViewSet,
    AdminDashboardStatsView,
    AdminTalentListView,
)

# Setup Router untuk ViewSets
router = DefaultRouter()
router.register(r'me/skills', SkillViewSet, basename='my-skills')
router.register(r'me/experiences', ExperienceViewSet, basename='my-experiences')
router.register(r'me/portfolios', PortfolioViewSet, basename='my-portfolios')

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

    # 3. Router URLs untuk CRUD (Skills, Experiences, Portfolios)
    # Akses: /api/talents/me/skills/, /api/talents/me/experiences/, /api/talents/me/portfolios/
    path('', include(router.urls)),

    # 4. URL untuk download CV (Public)
    # Akses: /api/talents/<username>/download-cv/
    path('<str:user__username>/download-cv/', DownloadCVView.as_view(), name='download-cv'),

    # 5. URL untuk melihat detail talent berdasarkan username (Public)
    # Akses: /api/talents/afrizal/
    path('<str:user__username>/', PublicTalentDetailView.as_view(), name='talent-detail'),

    # === ADMIN DASHBOARD STATS VIEW ===
    path('admin/talents/', AdminTalentListView.as_view(), name='admin-talent-list'),

    path('admin/dashboard-stats/', AdminDashboardStatsView.as_view(), name='admin-dashboard-stats'),
]