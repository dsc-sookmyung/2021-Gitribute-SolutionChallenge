from django.shortcuts import redirect, render
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

from django.core.mail import EmailMessage
from django.utils.encoding import force_text
import traceback

from django.http.request import HttpRequest
from django.shortcuts import redirect, render
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.template.loader import render_to_string

from django.core.mail import EmailMessage
from django.utils.encoding import force_text
import traceback
from random import *

from django.db import connection

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

            sortcenter = [] # 비교한 센터와 현재 위치의 거리와 센터 id 저장할 배열

            for i in range(1, 53) : # 전체 디비의 센터와 거리 비교
                center = Center.objects.get(id = i)          
                sortcenter.append(center.name)

            sortcenter = sorted(sortcenter) # 오름차순으로 정렬

            center = Center.objects.get(name = sortcenter[0])

            names = sortcenter

        elif int(area) == 1 or int(area) == 2 or int(area) == 3 or int(area) == 4 or int(area) == 5 :
            
            sortcenter = []

            for i in range(1, 53) :
                center = Center.objects.get(id = i)

                if str(center.area) == str(area) :

                    sortcenter.append(center.name)

            sortcenter = sorted(sortcenter)
            center = Center.objects.get(name = sortcenter[0])

            names = sortcenter

        else:
            return Response({'message':"doesn't exist"})
        
        total = center.pantyliner + center.medium + center.large + center.overnight

        centerlocation = gmaps.reverse_geocode((center.lat, center.lng))
        result = centerlocation[0].get("formatted_address")

        response = {
            'center' : names,
            'area' : center.area,
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
            'location': result,
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

        centerlocation = gmaps.reverse_geocode((center.lat, center.lng))
        result = centerlocation[0].get("formatted_address")

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
            'location': result,
        }

        return Response(response, status=status.HTTP_200_OK)
    
    else:
        return Response({'message':"doesn't exist"})

@api_view(['PUT'])
@permission_classes([AllowAny])
def Centerdef(request):

    global centercount
    if request.method == 'PUT':
        centerserializer = CenterSerializer(data=request.data)

        centercount = Center.objects.get(id = 1)
        area = request.data["area"]
        place = request.data["place"]
        
        centercount = Center.objects.get(name = request.data["place"])

        user = User.objects.get(username = request.user)

        if (int(request.data['originalLiner']) != 0 and int(request.data['originalMedium']) != 0 and int(request.data['originalLarge']) != 0 and int(request.data['originalOvernight'] != 0)):
            if (centercount.pantyliner != int(request.data['originalLiner']) or centercount.medium != int(request.data['originalMedium']) or centercount.large != int(request.data['originalLarge']) or centercount.overnight != int(request.data['originalOvernight'])):

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

                if errorlistserializer.is_valid():
                    errorlistserializer.save()

                centercount.pantyliner = int(request.data['originalLiner'])
                centercount.medium = int(request.data['originalMedium'])
                centercount.large = int(request.data['originalLarge'])
                centercount.overnight = int(request.data['originalOvernight'])

                if centerserializer.is_valid():
                    centercount.save()

        if user.role == 1:

            centercount.pantyliner -= int(request.data['linerCounter'])
            centercount.medium -= int(request.data['mediumCounter'])
            centercount.large -= int(request.data['largeCounter'])
            centercount.overnight -= int(request.data['overnightCounter'])

            centercount.save()

        if user.role == 2:
            
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

            centerdistance.append([center.name, distance])

        sortcenterdistance = sorted(centerdistance, key = lambda x : x[1]) # 오름차순으로 정렬

        center = Center.objects.get(name = sortcenterdistance[0][0])

        total = center.pantyliner + center.medium + center.large + center.overnight

        centerlocation = gmaps.reverse_geocode((center.lat, center.lng))
        result = centerlocation[0].get("formatted_address")

        response = {
            'center' : {sortcenterdistance[0][0], sortcenterdistance[1][0]},
            'area' : center.area,
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
            'location': result,
        }

        return Response(response, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def locationbutton(request):
    auth_token = request.headers.get("Authorization", None)

    if auth_token == None:
      return JsonResponse({'message':'Enter the token.'}, status=401)

    if request.method == 'POST':
        user = User.objects.get(email = request.user.email)
        center = Center.objects.get(name = request.data["center"])
        
        if int(user.role) == 1:

            # 메일 보내기
            message = render_to_string('center/Receiver_pushbutton_email_send.html', {
                'password': center.password,
                'username' : user.username,
                'centername' : center.name,
                #위치
                'lat' : center.lat,
                'lng' : center.lng,
                })

            mail_subject = 'Blooming Location Button'
            to_email = user.email
            email = EmailMessage(mail_subject, message, to=[to_email])
            email.send()

            return Response({"message": "location send"}, status=status.HTTP_200_OK)


        elif int(user.role) == 2:

            # 메일 보내기
            message = render_to_string('center/Donor_pushbutton_email_send.html', {
                'username' : user.username,
                'centername' : center.name,
                #위치
                'lat' : center.lat,
                'lng' : center.lng,
                })

            mail_subject = 'Blooming Location Button'
            to_email = user.email
            email = EmailMessage(mail_subject, message, to=[to_email])
            email.send()

            return Response({"message": "location send"}, status=status.HTTP_200_OK)

        else :
            return Response({"message": 'no email'}, status=status.HTTP_200_OK)