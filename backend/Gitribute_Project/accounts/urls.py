from django.urls import path

from . import views

#함수형 뷰를 호출했기 때문
urlpatterns = [
    path('signup/', views.createUser),
    path('login/', views.login),
    path('mypage/', views.mypage),

]