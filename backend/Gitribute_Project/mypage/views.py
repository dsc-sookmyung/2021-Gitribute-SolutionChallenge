from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import DonorCreateSerializer, ReceiverCreateSerializer, UserLoginSerializer
from .models import User

from django.db import connection
    
@api_view(['POST'])
@permission_classes([AllowAny])
def checkpassword(request):
    auth_token = request.headers.get("Authorization", None)

    # 토큰 값이 아예 안 들어왔을 때 401 코드 처리 및 메시지 출력
    if auth_token == None:
      return JsonResponse({'message':'Enter the token.'}, status=401)

    print(auth_token)
    if request.method == 'POST':
        user = User.objects.get(email = request.user.email)

        if (user.check_password(request.data['currentPassword']) == 1):
            return Response({"message": "Password Right"}, status=status.HTTP_409_CONFLICT)
        else :          
            return Response({"message": "Password Wrong"}, status=status.HTTP_409_CONFLICT)


@api_view(['POST'])
@permission_classes([AllowAny])
def updatepassword(request):
    auth_token = request.headers.get("Authorization", None)

    # 토큰 값이 아예 안 들어왔을 때 401 코드 처리 및 메시지 출력
    if auth_token == None:
      return JsonResponse({'message':'Enter the token.'}, status=401)

    print(auth_token)
    if request.method == 'POST':
        user = User.objects.get(email = request.user.email)
        
        print(user.password)

        user.set_password(request.data['newPassword'])

        user.save()
        print(user.password)

        return Response({"message": "Password update"}, status=status.HTTP_409_CONFLICT)
        

@api_view(['POST'])
@permission_classes([AllowAny])
def deleteaccount(request):
    auth_token = request.headers.get("Authorization", None)

    # 토큰 값이 아예 안 들어왔을 때 401 코드 처리 및 메시지 출력
    if auth_token == None:
      return JsonResponse({'message':'Enter the token.'}, status=401)

    print(auth_token)
    if request.method == 'POST':
        user = User.objects.get(email = request.user.email)

        if (user.check_password(request.data['currentPassword']) == 1):
            print("Password correct")

            email = user.email

            curs = connection.cursor()
            sql = "delete from accounts_user where email = email"
            curs.execute(sql)
            connection.commit()

            return Response({"message": "Delete success"}, status=status.HTTP_409_CONFLICT)
        
        else :
            return Response({"message": "Delete fail"}, status=status.HTTP_409_CONFLICT)

@api_view(['POST'])
@permission_classes([AllowAny])
def updateprivacy(request):
    auth_token = request.headers.get("Authorization", None)

    # 토큰 값이 아예 안 들어왔을 때 401 코드 처리 및 메시지 출력
    if auth_token == None:
      return JsonResponse({'message':'Enter the token.'}, status=401)

    print(auth_token)
    if request.method == 'POST':
        user = User.objects.get(email = request.user.email)
        
        print(user.username)

        user.username = request.data['newUsername']

        user.save()
        print(user.username)

        return Response({"message": "Privacy Update success"}, status=status.HTTP_409_CONFLICT)
        