from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include, url
from account import views

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    path('admin/', admin.site.urls),
    path('users/', include('account.urls')),
]
