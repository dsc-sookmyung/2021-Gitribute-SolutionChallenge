from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import CenterSerializer, ErrorListSerializer
from .models import Center, ErrorList

from accounts.serializers import DonorCreateSerializer, ReceiverCreateSerializer, UserLoginSerializer
from accounts.models import User


@api_view(['POST'])
@permission_classes([AllowAny])
def getDefaultCenter(request):
    if request.method == 'POST':
        area = request.data["area"]

        if int(area) == 0:
            print("total 시리얼라이저")
            center = Center.objects.get(id = 1)

            total = center.pantyliner + center.medium + center.large + center.overnight
            print(total)

            response = {
                'area' : center.area,
                'center' : 'BaengmaStaion, MaduStaion',
                'name' : center.name,
                'lat' : center.lat,
                'lng': center.lng,
                'liner' : center.pantyliner,
                'medium': center.medium,
                'large': center.large,
                'overnight': center.overnight,
                'total' : total,
                'password': center.password,
                'phonenumber': center.phonenumber,
                'location': center.location,
            }

        elif int(area) == 2:
            print("gyeonggi 시리얼라이저")
            center = Center.objects.get(id = 1)

            total = center.pantyliner + center.medium + center.large + center.overnight
            print(total)

            response = {
                'area' : center.area,
                'center' : 'BaengmaStaion, MaduStaion',
                'name' : center.name,
                'lat' : center.lat,
                'lng': center.lng,
                'liner' : center.pantyliner,
                'medium': center.medium,
                'large': center.large,
                'overnight': center.overnight,
                'total' : total,
                'password': center.password,
                'phonenumber': center.phonenumber,
                'location': center.location,
            }
            
        else:
            print("validated_serializer 오류")
            return Response({'message':"doesn't exist"})

        return Response(response, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def getCenter(request):
    if request.method == 'POST':
        area = request.data["area"]
        place = request.data["place"]

        if (int(area) == 2 and place == "Baengma"):
            print("Baengma 시리얼라이저")
            center = Center.objects.get(id = 1)

            total = center.pantyliner + center.medium + center.large + center.overnight
            print(total)

            response = {
                'name' : center.name,
                'lat' : center.lat,
                'lng': center.lng,
                'liner' : center.pantyliner,
                'medium': center.medium,
                'large': center.large,
                'overnight': center.overnight,
                'total' : total,
                'password': center.password,
                'phonenumber': center.phonenumber,
                'location': center.location,
            }

        elif (int(area) == 2 and place == "Madu"):
            print("Madu 시리얼라이저")
            center = Center.objects.get(id = 2)

            total = center.pantyliner + center.medium + center.large + center.overnight
            print(total)

            response = {
                'name' : center.name,
                'lat' : center.lat,
                'lng': center.lng,
                'liner' : center.pantyliner,
                'medium': center.medium,
                'large': center.large,
                'overnight': center.overnight,
                'total' : total,
                'password': center.password,
                'phonenumber': center.phonenumber,
                'location': center.location,
            }
            
        else:
            print("validated_serializer 오류")
            return Response({'message':"doesn't exist"})

        return Response(response, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([AllowAny])
def Centerdef(request):

    global centercount
    if request.method == 'PUT':
        area = request.data["area"]
        place = request.data["place"]
        print(place)
        if (int(area) == 2 and place == "Baengma"):
            centercount = Center.objects.get(id = 1)
        elif (int(area) == 2 and place == "Madu"):
            centercount = Center.objects.get(id = 2)

        user = User.objects.get(username = request.user)

        if (centercount.pantyliner != int(request.data['originalLiner']) or centercount.medium != int(request.data['originalMedium']) or centercount.large != int(request.data['originalLarge']) or centercount.overnight != int(request.data['originalOvernight'])):
            
            print("개수 다름")

            data = {
                "email" : user.email,
                "centerpantyliner" : centercount.pantyliner,
                "centermedium" : centercount.medium,
                "centerlarge" : centercount.large,
                "centerovernight" : centercount.overnight,
                "inputpantyliner" : int(request.data['originalLiner']),
                "inputmedium" : int(request.data['originalMedium']),
                "inputlarge" : int(request.data['originalLarge']),
                "inputovernight" : int(request.data['originalOvernight']),
            }
        
            errorlistserializer = ErrorListSerializer(data=data)
            print(errorlistserializer.is_valid())
            print(errorlistserializer.errors)
            if errorlistserializer.is_valid():
                print("errorlistserializer.save()")
                errorlistserializer.save()

            centercount.pantyliner = int(request.data['originalLiner'])
            centercount.medium = int(request.data['originalMedium'])
            centercount.large = int(request.data['originalLarge'])
            centercount.overnight = int(request.data['originalOvernight'])

            if CenterSerializer.is_valid():
                centercount.save()

        print(user.role)
        if user.role == 1:
            print("Receiver")

            centercount.pantyliner -= int(request.data['linerCounter'])
            centercount.medium -= int(request.data['mediumCounter'])
            centercount.large -= int(request.data['largeCounter'])
            centercount.overnight -= int(request.data['overnightCounter'])

            centercount.save()

        if user.role == 2:
            print("Donor")
            
            centercount.pantyliner += int(request.data['linerCounter'])
            centercount.medium += int(request.data['mediumCounter'])
            centercount.large += int(request.data['largeCounter'])
            centercount.overnight += int(request.data['overnightCounter'])

            centercount.save()
            
        return Response({'message':'center update'})
    