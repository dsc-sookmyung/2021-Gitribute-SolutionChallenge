from django.http.request import HttpRequest
from django.shortcuts import redirect, render
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.template.loader import render_to_string
from .serializers import DonorCreateSerializer, ReceiverCreateSerializer, UserLoginSerializer
from .models import User
from .token import account_activation_token
from django.core.mail import EmailMessage
from django.utils.encoding import force_text
import traceback
from random import *

from django.db import connection

@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    if request.method == 'POST':
        num = request.data["role"]
        print(num)

        #num이 1이면 Receiver, 2이면 Donor
        if int(num) == 1:
            print("receiver시리얼라이저")
            serializer = ReceiverCreateSerializer(data=request.data)
        elif int(num) == 2:
            print("donor시리얼라이저")
            serializer = DonorCreateSerializer(data=request.data)
        else:
            print("validated_serializer 오류")

        
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        if User.objects.filter(email=serializer.validated_data['email']).first() is None:
            serializer.save()
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)

        return Response({"message": "duplicate email"}, status=status.HTTP_409_CONFLICT)


@api_view(['GET'])
@permission_classes([AllowAny])
def UserActivate(request, uidb64, token):
    if request.method == 'GET':
        try: 
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        try:

            if user is not None and account_activation_token.check_token(user, token):
                    print(user.email)
                    user.is_active = True
                    user.save()
                    return redirect('http://localhost:3000/join_success')
                    #return Response({"message":user.email + ' has been activated.'}, status=status.HTTP_200_OK)
            else:
                return Response({"message":'This link has expired.'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(traceback.format_exc())



@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        u=request.data
        print(u)
        serializer = UserLoginSerializer(data=request.data)
        
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)
        if serializer.validated_data['email'] == "None":
            return Response({'message': 'Password Error'}, status=status.HTTP_200_OK)
        if serializer.validated_data['email'] == "NoExist":
            return Response({'message': 'No Email'}, status=status.HTTP_200_OK)

        #Login한 User에 따라 Front에 값 다른 response값(+token) 보내줌, LS에 저장
        who = User.objects.get(email=serializer.data['email'])
        print(who.role)
        if who.role == 1:
            print("Receiver입니다.")
            response = {
                'username' : who.username,
                'role' : who.role,
                'center': who.center,
                'total' : who.total,
                'success': 'True',
                'token': serializer.data['token']

            }
        elif who.role == 2:
            print("Donor입니다.")
            response = {
                'username' : who.username,
                'role': who.role,
                'center': who.center,
                'level' : who.level,
                'liner' : who.liner,
                'medium' : who.medium,
                'large' : who.large,
                'overnight' : who.overnight,
                'total' : who.total,
                'visibility' : who.visibility,
                'success': 'True',
                'token': serializer.data['token'],
                
            }
        else:
            print("Error")
            response = {
                'success' : 'False'
            }
        
        return Response(response, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def mypage(request):
    auth_token = request.headers.get("Authorization", None)

    # 토큰 값이 아예 안 들어왔을 때 401 코드 처리 및 메시지 출력
    if auth_token == None:
      return JsonResponse({'message':'Enter the token.'}, status=401)

    print(auth_token)
    if request.method == 'GET':
        user = User.objects.get(email = request.user.email)
        if user.role == 1:

            response = {
                'username' : user.username,
                'role' : user.role,
                'center': user.center,
                'total' : user.total,
                'token' : auth_token,
            }

        if user.role == 2:
            
            response = {
                'username' : user.username,
                'role': user.role,
                'center': user.center,
                'level' : user.level,
                'liner' : user.liner,
                'medium' : user.medium,
                'large' : user.large,
                'overnight' : user.overnight,
                'token' : auth_token,
            }
            

        return Response(response, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        user = User.objects.get(username = request.user)
        print(user.role)
        if user.role == 1:
            print("Receiver")
            num = int(request.data['liner']) + int(request.data['medium']) + int(request.data['large']) + int(request.data['overnight'])
            user.total -= num

            if user.total < 0:
                user.total += num
                return Response({'message': 'Availability limit exceeded. Please check again.'})

            user.save()

        if user.role == 2:
            print("Donor")

            #print(type(user.liner)) -> int
            #print(type(request.data['liner'])) -> str
            
            user.liner += int(request.data['liner'])
            user.medium += int(request.data['medium'])
            user.large += int(request.data['large'])
            user.overnight += int(request.data['overnight'])

            total = user.liner + user.medium + user.large + user.overnight
            print(total)
            if total > 50:
                user.level = 4
            elif total > 30:
                user.level = 3
            elif total > 10:
                user.level = 2
            else:
                user.level = 1

            user.total = total
            user.save()

        return Response({'message':'put request'})
      
@api_view(['POST'])
@permission_classes([AllowAny])
def forgetpassword(request):
    if request.method == 'POST':
        
        if User.objects.filter(email = request.data["email"]).exists():
            user = User.objects.get(email = request.data["email"])

            randnum = str(randrange(10)) + str(randrange(10)) + str(randrange(10)) + str(randrange(10))
            print(randnum)

            #받아온 이메일로 메일 보내기
            message = render_to_string('accounts/forget_password_email_send.html', {
                'password': randnum,
                'username' : user.username,
                })

            mail_subject = 'Blooming Reset Password'
            to_email = request.data["email"]
            email = EmailMessage(mail_subject, message, to=[to_email])
            email.send()

            user.set_password(randnum)

            user.save()

            return Response({"message": "reset password"}, status=status.HTTP_200_OK)

        else :
            return Response({"message": 'no email'}, status=status.HTTP_200_OK)
            