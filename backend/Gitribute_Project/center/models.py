from django.db import models
from django.db.models import CharField, Model

class Center(models.Model):
    area = models.CharField(max_length=1000, null=True)
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

class ErrorList(models.Model):
    email = models.EmailField(max_length=64,unique=False)
    centerpantyliner = models.IntegerField(null=True)
    centermedium = models.IntegerField(null=True)
    centerlarge = models.IntegerField(null=True)
    centerovernight = models.IntegerField(null=True)
    inputpantyliner = models.IntegerField(null=True)
    inputmedium = models.IntegerField(null=True)
    inputlarge = models.IntegerField(null=True)
    inputovernight = models.IntegerField(null=True)

    class Meta:
        db_table = 'errorlist'

    