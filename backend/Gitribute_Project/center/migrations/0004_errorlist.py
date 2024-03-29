# Generated by Django 3.1.7 on 2021-03-22 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('center', '0003_auto_20210318_0550'),
    ]

    operations = [
        migrations.CreateModel(
            name='ErrorList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=64, unique=True)),
                ('centerpantyliner', models.IntegerField(null=True)),
                ('centermedium', models.IntegerField(null=True)),
                ('centerlarge', models.IntegerField(null=True)),
                ('centerovernight', models.IntegerField(null=True)),
                ('inputpantyliner', models.IntegerField(null=True)),
                ('inputmedium', models.IntegerField(null=True)),
                ('inputlarge', models.IntegerField(null=True)),
                ('inputovernight', models.IntegerField(null=True)),
            ],
            options={
                'db_table': 'errorlist',
            },
        ),
    ]
