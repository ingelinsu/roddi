# Generated by Django 3.1.2 on 2021-02-18 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roddi', '0003_auto_20210218_1053'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(default='', max_length=120),
        ),
    ]