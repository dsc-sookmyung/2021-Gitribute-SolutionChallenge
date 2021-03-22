from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import DonorCreateSerializer, ReceiverCreateSerializer, UserLoginSerializer
from .models import User

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
            print(serializer.data)
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)
        return Response({"message": "duplicate email"}, status=status.HTTP_409_CONFLICT)


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
                'ceneter': who.center,
                'level' : who.level,
                'liner' : who.liner,
                'medium' : who.medium,
                'large' : who.large,
                'overnight' : who.overnight,
                'success': 'True',
                'token': serializer.data['token']
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
        user = User.objects.get(username = request.user)
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

            user.save()

        return Response({'message':'put request'})
    