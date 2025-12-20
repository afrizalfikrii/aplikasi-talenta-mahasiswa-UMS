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
)

router = DefaultRouter()
router.register(r'me/skills', SkillViewSet, basename='my-skills')
router.register(r'me/experiences', ExperienceViewSet, basename='my-experiences')
router.register(r'me/portfolios', PortfolioViewSet, basename='my-portfolios')

urlpatterns = [
    path('', PublicTalentListView.as_view(), name='talent-list'),
    path('latest/', LatestTalentListView.as_view(), name='latest-talents'),
    path('me/', MyProfileView.as_view(), name='my-profile'),
    path('', include(router.urls)),
    path('<str:user__username>/download-cv/', DownloadCVView.as_view(), name='download-cv'),
    path('<str:user__username>/', PublicTalentDetailView.as_view(), name='talent-detail'),
    path('admin/dashboard-stats/', AdminDashboardStatsView.as_view(), name='admin-dashboard-stats'),
]