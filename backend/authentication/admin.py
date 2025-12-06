from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
# Register your models here.

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'role', 'nim')

    fieldsets = UserAdmin.fieldsets + (
        ('Extra Fields', {'fields': ('role', 'nim')}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Extra Fields', {'fields': ('role', 'nim')}),
    )
    
admin.site.register(User, CustomUserAdmin)