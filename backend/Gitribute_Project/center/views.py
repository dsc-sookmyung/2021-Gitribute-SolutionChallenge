from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import CenterSerializer, ErrorListSerializer
from .models import Center, ErrorList

from accounts.serializers import DonorCreateSerializer, ReceiverCreateSerializer, UserLoginSerializer
from accounts.models import User

import googlemaps

import os, json
from django.core.exceptions import ImproperlyConfigured
from pathlib import Path

from django.db import connection
from haversine import haversine

BASE_DIR = Path(__file__).resolve().parent.parent

secret_file = os.path.join(BASE_DIR, 'secrets.json')

with open(secret_file) as f:
    secrets = json.loads(f.read())

def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)

@api_view(['POST'])
@permission_classes([AllowAny])
def getDefaultCenter(request):
    if request.method == 'POST':
        area = request.data["area"]
        gmaps = googlemaps.Client(key=get_secret("GEOCODING_API"))

        if int(area) == 0:
            print("total 시리얼라이저")
            center = Center.objects.get(id = 1)
        
        elif int(area) == 1:
            print("seoul 시리얼라이저")
            center = Center.objects.get(id = 13)

        elif int(area) == 2:
            print("gyeonggi 시리얼라이저")
            center = Center.objects.get(id = 1)
            
        elif int(area) == 3:
            print("gyeonggi 시리얼라이저")
            center = Center.objects.get(id = 23)

        elif int(area) == 4:
            print("gyeonggi 시리얼라이저")
            center = Center.objects.get(id = 33)
        
        elif int(area) == 5:
            print("gyeonggi 시리얼라이저")
            center = Center.objects.get(id = 43)

        else:
            print("validated_serializer 오류")
            return Response({'message':"doesn't exist"})
        
        total = center.pantyliner + center.medium + center.large + center.overnight
        print(total)

        #centerlocation = gmaps.reverse_geocode((center.lat, center.lng))
        #result = centerlocation[0].get("formatted_address")
        #print(result)

        curs = connection.cursor()
        sql = "select name from center"
        curs.execute(sql)
        names = curs.fetchall()


        response = {
            'area' : center.area,
            'center' : {names[0][0], names[1][0]},
            'name' : center.name,
            'lat' : center.lat,
            'lng': center.lng,
            'pads' : {'liner' : center.pantyliner,
            'medium': center.medium,
            'large': center.large,
            'overnight': center.overnight,
            'total' : total},
            'password': center.password,
            'phonenumber': center.phonenumber,
            #'location': result,
        }

        return Response(response, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def getCenter(request):
    if request.method == 'POST':
        area = request.data["area"]
        place = request.data["place"]
        gmaps = googlemaps.Client(key=get_secret("GEOCODING_API"))

        center = Center.objects.get(name = request.data["place"])

        total = center.pantyliner + center.medium + center.large + center.overnight
        print(total)

        #centerlocation = gmaps.reverse_geocode((center.lat, center.lng))
        #result = centerlocation[0].get("formatted_address")
        #print(result)

        response = {
            'name' : center.name,
            'lat' : center.lat,
            'lng': center.lng,
            'pads' : {'liner' : center.pantyliner,
            'medium': center.medium,
            'large': center.large,
            'overnight': center.overnight,
            'total' : total},
            'password': center.password,
            'phonenumber': center.phonenumber,
            #'location': result,
        }

        return Response(response, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([AllowAny])
def Centerdef(request):

    global centercount
    if request.method == 'PUT':
        centerserializer = CenterSerializer(data=request.data)

        centercount = Center.objects.get(id = 1)
        area = request.data["area"]
        place = request.data["place"]
        print(place)
        
        centercount = Center.objects.get(name = request.data["place"])

        user = User.objects.get(username = request.user)

        if (int(request.data['originalLiner']) != 0 and int(request.data['originalMedium']) != 0 and int(request.data['originalLarge']) != 0 and int(request.data['originalOvernight'] != 0)):
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

                if centerserializer.is_valid():
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
    
@api_view(['POST'])
@permission_classes([AllowAny])
def nearestCenter(request):
    if request.method == 'POST':
        currentlocation = (float(request.data["lat"]), float(request.data["lng"]))
        gmaps = googlemaps.Client(key=get_secret("GEOCODING_API"))

        centerdistance = [] # 비교한 센터와 현재 위치의 거리와 센터 id 저장할 배열

        for i in range(1, 53) : # 전체 디비의 센터와 거리 비교
            center = Center.objects.get(id = i)
            dbcenter = (float(center.lat), float(center.lng))

            distance = haversine(currentlocation, dbcenter, unit = "m")
            print("center : ",center.lat, center.lng, distance)
            centerdistance.append([center.id, distance])
        print(centerdistance)
        sortcenterdistance = sorted(centerdistance, key = lambda x : x[1]) # 오름차순으로 정렬
        print(sortcenterdistance)


        center1 = Center.objects.get(id = sortcenterdistance[0][0])

        total1 = center1.pantyliner + center1.medium + center1.large + center1.overnight

        #centerlocation = gmaps.reverse_geocode((center1.lat, center1.lng))
        #result1 = centerlocation[0].get("formatted_address")

        center2 = Center.objects.get(id = sortcenterdistance[1][0])

        total2 = center2.pantyliner + center2.medium + center2.large + center2.overnight

        #centerlocation = gmaps.reverse_geocode((center2.lat, center2.lng))
        #result2 = centerlocation[0].get("formatted_address")

        response = {
            'center1' : "center1",
            'name1' : center1.name,
            'lat1' : center1.lat,
            'lng1': center1.lng,
            'pads1' : {'liner' : center1.pantyliner,
            'medium': center1.medium,
            'large': center1.large,
            'overnight': center1.overnight,
            'total' : total1},
            'password1': center1.password,
            'phonenumber1': center1.phonenumber,
            #'location1': result1,
            'center2' : "center2",
            'name2' : center2.name,
            'lat2' : center2.lat,
            'lng2': center2.lng,
            'pads2' : {'liner' : center2.pantyliner,
            'medium': center2.medium,
            'large': center2.large,
            'overnight': center2.overnight,
            'total' : total2},
            'password2': center2.password,
            'phonenumber2': center2.phonenumber,
            #'location2': result2,
        }

        return Response(response, status=status.HTTP_200_OK)