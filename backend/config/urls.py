from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Import untuk Login (JWT) & Dokumentasi (Swagger)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Konfigurasi Dokumentasi API (Swagger)
schema_view = get_schema_view(
   openapi.Info(
      title="UMS Student Talent API",
      default_version='v1',
      description="Dokumentasi API Tugas Besar TIF 1336",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/talents/', include('talents.urls')),
    path('api/auth/', include('authentication.urls')),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

# Agar gambar profil bisa dibuka saat development (Debug mode)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)