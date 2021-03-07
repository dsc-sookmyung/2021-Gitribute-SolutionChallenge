from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate
from .models import User
import os

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

User = get_user_model()

#회원가입
class UserCreateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    nickname = serializers.CharField(required=True)
    image = serializers.ImageField(required=False)
    password = serializers.CharField(required=True)
   
    
    def create(self, validated_data):
        user = User.objects.create( # User 생성
            email=validated_data['email'],
            nickname=validated_data['nickname'],
            #image=validated_data['image'],
            
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

#로그인
class UserLoginSerializer(serializers.Serializer):
    nickname = serializers.CharField(max_length=32)
    #email = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        nickname=data.get("nickname", None)
        #email = data.get("email", None)
        password = data.get("password", None)
        user = authenticate(nickname=nickname, password=password)

        if user is None:
            return {
                'nickname': 'None'
            }
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )
        return {
            'nickname': user.nickname,
            'token': jwt_token
        }