from django.db import models
from django.db.models import CharField, Model

class Center(models.Model):
    name = models.CharField(max_length=1000)
    lat = models.FloatField()
    lng = models.FloatField()
    pantyliner = models.IntegerField(null=True)
    medium = models.IntegerField(null=True)
    large = models.IntegerField(null=True)
    overnight = models.IntegerField(null=True)
    password = models.IntegerField(null=True)
    phonenumber = models.CharField(max_length=1000)
    location = models.CharField(max_length=1000)

    class Meta:
        db_table = 'center'

    