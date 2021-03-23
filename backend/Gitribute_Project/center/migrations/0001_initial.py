# Generated by Django 3.1.7 on 2021-03-14 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Center',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('lat', models.FloatField()),
                ('lng', models.FloatField()),
                ('pantyliner', models.IntegerField(null=True)),
                ('medium', models.IntegerField(null=True)),
                ('large', models.IntegerField(null=True)),
                ('overnight', models.IntegerField(null=True)),
                ('password', models.IntegerField(null=True)),
                ('weekday', models.CharField(max_length=1000)),
                ('sat', models.CharField(max_length=1000)),
                ('sun', models.CharField(max_length=1000)),
                ('phonenumber', models.CharField(max_length=1000)),
                ('location', models.CharField(max_length=1000)),
            ],
        ),
    ]