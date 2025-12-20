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
    AdminToggleUserStatusView,
    AdminUpdateUserView,
    HomePageStatsView,
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
    path('stats/', HomePageStatsView.as_view(), name='talent-stats'),
    path('<str:user__username>/download-cv/', DownloadCVView.as_view(), name='download-cv'),
    path('<str:user__username>/', PublicTalentDetailView.as_view(), name='talent-detail'),
    path('admin/talents/', AdminTalentListView.as_view(), name='admin-talent-list'),
    path('admin/dashboard-stats/', AdminDashboardStatsView.as_view(), name='admin-dashboard-stats'),
    path('admin/users/<int:pk>/toggle-status/', AdminToggleUserStatusView.as_view(), name='admin-toggle-user-status'),
    path('admin/users/<int:pk>/', AdminUpdateUserView.as_view(), name='admin-update-user'),
]