from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from accounts.serializers import DonorCreateSerializer, ReceiverCreateSerializer, UserLoginSerializer
from accounts.models import User

from django.db import connection
    
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def mypage(request):
    auth_token = request.headers.get("Authorization", None)

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
def checkpassword(request):
    auth_token = request.headers.get("Authorization", None)

    if auth_token == None:
      return JsonResponse({'message':'Enter the token.'}, status=401)

    print(auth_token)
    if request.method == 'POST':
        user = User.objects.get(email = request.user.email)

        if (user.check_password(request.data['currentPassword']) == 1):
            return Response({"message" : "true"}, status=status.HTTP_200_OK)

        else :          
            return Response({"message" : "false"}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def updatepassword(request):
    auth_token = request.headers.get("Authorization", None)

    if auth_token == None:
      return JsonResponse({'message':'Enter the token.'}, status=401)

    print(auth_token)
    if request.method == 'POST':
        user = User.objects.get(email = request.user.email)
        
        print(user.password)

        user.set_password(request.data['newPassword'])

        user.save()
        print(user.password)

        return Response({"message" : "Password Update success"}, status=status.HTTP_200_OK)
        

@api_view(['POST'])
@permission_classes([AllowAny])
def deleteaccount(request):
    auth_token = request.headers.get("Authorization", None)

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

            return Response({"message" : "success"}, status=status.HTTP_200_OK)
        
        elif (user.check_password(request.data['currentPassword']) == 0):
            return Response({"message" : "incorrect"}, status=status.HTTP_200_OK)
        
        else :
            return Response({"message" : "fail"}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def updateprivacy(request):
    auth_token = request.headers.get("Authorization", None)

    if auth_token == None:
      return JsonResponse({'message':'Enter the token.'}, status=401)

    print(auth_token)
    if request.method == 'POST':
        user = User.objects.get(email = request.user.email)
        

        user.username = request.data['newUsername']
        user.visibility = request.data['isVisible']

        user.save()
        print(user.username)

        return Response({"message": "Privacy Update success"}, status=status.HTTP_200_OK)