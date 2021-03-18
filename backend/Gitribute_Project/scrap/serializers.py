from rest_framework import serializers
from accounts.views import User

class ScrapSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
