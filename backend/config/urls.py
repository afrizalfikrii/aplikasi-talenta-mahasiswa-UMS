from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse
from django.core.management import call_command
from django.views.static import serve


def magic_migrate(request):
    try:
        call_command('migrate')
        return JsonResponse({"status": "success", "message": "Database Migration Completed Successfully! ✅"})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)})

from django.contrib.auth import get_user_model

def magic_create_superuser(request):
    try:
        User = get_user_model()
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            return JsonResponse({"status": "success", "message": "Superuser 'admin' created! Password: 'admin123' 🔑"})
        else:
            return JsonResponse({"status": "info", "message": "Superuser 'admin' already exists. Login with 'admin123' 🔒"})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)})

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
    path('', lambda request: JsonResponse({"message": "TalentaUMS API is running", "version": "1.0"})),
    path('magic-migrate/', magic_migrate),
    # Route khusus untuk melayani file media di Production (Railway)
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    path('magic-create-superuser/', magic_create_superuser),
]

# Agar gambar profil bisa dibuka saat development (Debug mode)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)