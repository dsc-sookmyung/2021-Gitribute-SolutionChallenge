from django.urls import path

from . import views
app_name = 'mypage'

#함수형 뷰를 호출했기 때문
urlpatterns = [
    path('checkPassword/', views.checkpassword),
    path('updatePassword/', views.updatepassword),
    path('deleteAccount/', views.deleteaccount),
    path('updatePrivacy/', views.updateprivacy),

]