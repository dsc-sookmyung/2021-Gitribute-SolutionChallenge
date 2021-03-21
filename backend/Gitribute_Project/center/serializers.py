from rest_framework import serializers 
from .models import Center

class CenterSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Center # 모델 설정 
        fields = ('id', 'name', 'lat', 'lng', 'pantyliner', 'medium', 'large', 'overnight', 'password', 'phonenumber', 'location') # 필드 설정