from django.urls import path

from . import views
app_name = 'accounts'

#fuction view
urlpatterns = [
    path('signup/', views.createUser),
    path('login/', views.login),
    path('mypage/', views.mypage),
    path('forgetpassword/', views.forgetpassword),
    path('activate/<str:uidb64>/<str:token>/', views.UserActivate, name='activate'),
    
]