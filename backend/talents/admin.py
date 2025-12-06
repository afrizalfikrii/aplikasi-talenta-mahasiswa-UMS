from django.contrib import admin
from .models import TalentProfile, Skill, Experience, Portfolio

# Kita buat tampilan admin lebih rapi (TabularInline)
# Jadi saat buka User, bisa langsung lihat skill/experience-nya (Opsional tapi keren)
class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1

class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 0

class PortfolioInline(admin.TabularInline):
    model = Portfolio
    extra = 0

# Setting tampilan TalentProfile di Admin
class TalentProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'is_open_to_work', 'updated_at')
    search_fields = ('user__username', 'user__email', 'summary')
    list_filter = ('is_open_to_work',)

# Register model
admin.site.register(TalentProfile, TalentProfileAdmin)
admin.site.register(Skill)
admin.site.register(Experience)
admin.site.register(Portfolio)