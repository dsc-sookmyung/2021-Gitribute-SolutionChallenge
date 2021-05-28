from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


#from .serializers import ChartSerializer
from accounts.models import User

import json

@api_view(['GET'])
@permission_classes([AllowAny])
def chart(request):

    if request.method == 'GET':

        userlist = User.objects.all().order_by('total').reverse()
        ranklist = [] # total 추가 리스트
        rankresult = [] # 순위 정렬 리스트
        rankingresult = [] # 프론트엔드 리턴 리스트

        i = 0

        for i in range(0, len(userlist)):
            
            u = userlist[i]

            ranking_username = u.username
            ranking_total = u.total
            ranking_level = u.level
            ranking_id = u.id
            ranklist.append(u.total)

            r = 1

            for j in range(0, len(ranklist)):
                if ranklist[i] < ranklist[j]:
                    r +=1
            rankresult.append(r)

            ranking = {
                'id':ranking_id,
                'username':ranking_username,
                'total':ranking_total,
                'level':ranking_level,
                'rank':rankresult[i],
            }

            i +=1

            print(ranking)
            rankingresult.append(ranking)
            resultjson = json.dumps(rankingresult)


        return Response(resultjson, status=status.HTTP_201_CREATED)