from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import get_user_model
from .models import User
from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

User = get_user_model()

class DonorCreateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    role = serializers.IntegerField(required=True)
    center = serializers.CharField(required=False)
    
    #Donor
    level = serializers.IntegerField(required=False)
    liner = serializers.IntegerField(required=False)
    medium = serializers.IntegerField(required=False)
    large = serializers.IntegerField(required=False)
    overnight = serializers.IntegerField(required=False)
    
    #Receiver
    #image_profile = serializers.ImageField(required=False)
    #total = serializers.IntegerField(required=False)
    

    def create(self, validated_data):
        donor = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            role=validated_data['role'],
            center=None,
            level = 1,
            liner = 0,
            medium = 0,
            large = 0,
            overnight = 0,
        )
        donor.set_password(validated_data['password'])

        donor.save()
        return donor
   
class ReceiverCreateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    role = serializers.IntegerField(required=True)
    center = serializers.CharField(required=False)
    
    #Donor
    #level = serializers.IntegerField(required=False)
    #liner = serializers.IntegerField(required=False)
    #medium = serializers.IntegerField(required=False)
    #large = serializers.IntegerField(required=False)
    #overnight = serializers.IntegerField(required=False)
    
    #Receiver
    image_profile = serializers.ImageField(required=True)
    total = serializers.IntegerField(required=False)
    

    def create(self, validated_data):
        receiver = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            role=validated_data['role'],
            image_profile=validated_data['image_profile'],
            center=None,
            total=10,
        )
        receiver.set_password(validated_data['password'])

        receiver.save()
        return receiver
   
    

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        
        #Email does not exist in User
        try:
            useremail = User.objects.get(email=email)
        except User.DoesNotExist:
            useremail = 'NoExist'

        if useremail == 'NoExist':
            return {
                'email' : 'NoExist'
            }

        #Email and Password is not correct
        user = authenticate(email=email, password=password)

        if user is None:
            return {
                'email': 'None'
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
            'email': user.email,
            'token': 'JWT ' + jwt_token
        }
