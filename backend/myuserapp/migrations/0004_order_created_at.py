# Generated by Django 4.2.5 on 2023-09-18 12:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myuserapp', '0003_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime.utcnow),
        ),
    ]
