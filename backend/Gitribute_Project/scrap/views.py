from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .serializers import ScrapSerializer
from accounts.models import User

class ScrapViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ScrapSerializer

    #허가된 사용자만 접근 가능
    permission_classes = [IsAuthenticated,]

    def put(self, request):
        
        user = User.objects.get(username = self.request.user)
        #print(user) 기존 db에서 username
        #print(self.request.user) JWT로 로그인한 Auth user, 
        
        #기존 center 정보와 입력받은 center와 다를때 등록
        if user.center != request.data['center']:
            user.center = request.data['center']
            user.save()
            return Response({'message': 'Center 등록 성공'})
        #기존 center 정보와 입력받은 center가 같을때 등록 취소
        else:
            user.center = None
            user.save()
            return Response({'message': '기존 Center 정보 삭제'})

     