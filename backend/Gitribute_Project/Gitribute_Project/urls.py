from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

#router = routers.DefaultRouter()
#router.register(r'center',CenterViewSet)

urlpatterns = [

    path('admin/', admin.site.urls),
    path('users/', include('accounts.urls')),
    path('center/', include('center.urls')),
   
]