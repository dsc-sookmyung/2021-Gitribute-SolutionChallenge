from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include, url


urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('users/', include('accounts.urls')),
    path('scrap/', include('scrap.urls')),
   
]
