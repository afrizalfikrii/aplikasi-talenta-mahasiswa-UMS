from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer untuk registrasi user baru (mahasiswa)
    """
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True, 
        required=True,
        style={'input_type': 'password'},
        label="Confirm Password"
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'nim', 'first_name', 'last_name']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
        }

    def validate(self, attrs):
        """
        Validasi password confirmation
        """
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({
                "password": "Password fields didn't match."
            })
        return attrs

    def validate_nim(self, value):
        """
        Validasi NIM harus unique dan format yang benar
        """
        if User.objects.filter(nim=value).exists():
            raise serializers.ValidationError("NIM sudah terdaftar.")
        
        # Validasi format NIM (contoh: harus 10 digit)
        if len(value) < 8 or len(value) > 12:
            raise serializers.ValidationError("NIM harus antara 8-12 karakter.")
        
        return value

    def validate_email(self, value):
        """
        Validasi email harus unique
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email sudah terdaftar.")
        return value

    def create(self, validated_data):
        """
        Create user baru dengan role 'student' secara default
        """
        # Hapus password2 karena tidak perlu disimpan
        validated_data.pop('password2')
        
        # Create user dengan password yang sudah di-hash
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            nim=validated_data['nim'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role='student'  # Default role adalah student
        )
        
        return user
