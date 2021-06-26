from django.urls import path

from . import views
app_name = 'accounts'

#fuction view
urlpatterns = [
    path('signup/', views.createUser),
    path('login/', views.login),
    path('mypage/', views.mypage),
    path('forgetPassword/', views.forgetpassword),
    path('activate_donor/<str:uidb64>/<str:token>/', views.DonorActivate, name='activate_donor'),
    path('activate_receiver/<str:uidb64>/<str:token>/', views.ReceiverActivate, name='activate_receiver'),
]