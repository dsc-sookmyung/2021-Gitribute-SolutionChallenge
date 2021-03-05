from django.urls import path

from . import views

urlpatterns = [
    path('create/', views.signup),
    path('login/', views.login),
]