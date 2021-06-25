from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views



urlpatterns = [
    path('defaultcenter/', views.getDefaultCenter),
    path('getcenter/', views.getCenter),
    path('centerdef/', views.Centerdef),
    path('nearcenter/', views.nearestCenter),
]