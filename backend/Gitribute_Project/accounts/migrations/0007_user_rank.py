# Generated by Django 3.1.7 on 2021-05-27 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_auto_20210330_1850'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='rank',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
