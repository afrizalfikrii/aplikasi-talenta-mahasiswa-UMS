from rest_framework import serializers
from .models import TalentProfile, Skill, Experience, Portfolio

# --- Serializer untuk Skill ---
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'skill_name', 'proficiency_level']

# --- Serializer untuk Experience ---
class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'job_title', 'company_name', 'start_date', 'end_date', 'is_current', 'description']

# --- Serializer untuk Portfolio ---
class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ['id', 'project_title', 'description', 'project_url', 'image', 'created_at']

# --- Serializer Utama: Talent Profile ---
class TalentProfileSerializer(serializers.ModelSerializer):
    # Kita ambil info username & email dari User agar ikut tampil
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    
    # Nested Serializers (Opsional: jika ingin data skill langsung muncul di profil)
    # skills = SkillSerializer(many=True, read_only=True)
    # experiences = ExperienceSerializer(many=True, read_only=True)
    # portfolios = PortfolioSerializer(many=True, read_only=True)

    class Meta:
        model = TalentProfile
        fields = [
            'id', 'user', 'username', 'email', 
            'profile_picture', 'phone_number', 'address', 'summary', 
            'linkedin_url', 'github_url', 'website_url', 
            'cv_file',
            'is_open_to_work', 'updated_at'
            # 'skills', 'experiences', 'portfolios' # Uncomment jika ingin nested
        ]
        read_only_fields = ['user'] # User tidak boleh diedit lewat sini