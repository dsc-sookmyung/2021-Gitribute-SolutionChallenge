from rest_framework import routers, urlpatterns
from django.urls import path, include
from django.urls.resolvers import URLPattern
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    path('', views.chart),
]

"""
router = DefaultRouter()
router.register(r'', views.ChartViewSet)

#rlpatterns = routers.urls
urlpatterns = [
    path('', include(router.urls)),
]
"""