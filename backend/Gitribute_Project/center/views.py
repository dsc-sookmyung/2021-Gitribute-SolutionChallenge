from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import CenterSerializer
from .models import Center

from accounts.serializers import DonorCreateSerializer, ReceiverCreateSerializer, UserLoginSerializer
from accounts.models import User


@api_view(['POST', 'PUT'])
@permission_classes([AllowAny])
def Centerdef(request):
    if request.method == 'POST':
        num = request.data["place"]
        print(num)

        if num == "Baegma":
            print("Baegma 시리얼라이저")
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
                'password': center.password,
                'phonenumber': center.phonenumber,
                'location': center.location,
                'total' : total,
            }

        elif num == "Madu":
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
                'password': center.password,
                'phonenumber': center.phonenumber,
                'location': center.location,
                'total' : total,
            }
            
        else:
            print("validated_serializer 오류")

        return Response(response, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        place = request.data["place"]
        print(place)
        if place == "Baegma":
            centercount = Center.objects.get(id = 1)
        elif place == "Madu":
            centercount = Center.objects.get(id = 2)

        user = User.objects.get(username = request.user)

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
    