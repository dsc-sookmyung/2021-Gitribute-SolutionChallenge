"""
from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.models import User

User = get_user_model

class ChartSerializer(serializers.Serializer):
    id = serializers.IntegerField
    username = serializers.CharField
    level = serializers.IntegerField
    total = serializers.IntegerField
    rank = serializers.IntegerField

    def list(self, validated_data):
        ranking = User.objects.get(

            id = validated_data['id'],
            username = validated_data['username'],
            level = validated_data['level'],
            total = validated_data['total'],
            rank = validated_data['rank'],
        )
        ranking.save()

        return ranking

    def create(self, validated_data):
        return object

    def update(self, instance, validated_data):
        return object
"""