from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.createUser),
    path('login/', views.login),
]