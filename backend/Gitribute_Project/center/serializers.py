from rest_framework import serializers 
from .models import Center,ErrorList

class CenterSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Center # 모델 설정 
        fields = ('id', 'name', 'lat', 'lng', 'pantyliner', 'medium', 'large', 'overnight', 'password', 'phonenumber', 'location') # 필드 설정

class ErrorListSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = ErrorList # 모델 설정 
        fields = ('email', 'centerpantyliner', 'centermedium', 'centerlarge', 'centerovernight', 'inputpantyliner', 'inputmedium', 'inputlarge', 'inputovernight') # 필드 설정