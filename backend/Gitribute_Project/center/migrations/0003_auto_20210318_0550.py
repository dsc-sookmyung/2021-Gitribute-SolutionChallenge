# Generated by Django 3.1.7 on 2021-03-17 20:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('center', '0002_auto_20210315_0445'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='center',
            name='sat',
        ),
        migrations.RemoveField(
            model_name='center',
            name='sun',
        ),
        migrations.RemoveField(
            model_name='center',
            name='weekday',
        ),
    ]
