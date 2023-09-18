# Generated by Django 4.2.5 on 2023-09-17 04:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myuserapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Books',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book_name', models.CharField(max_length=100)),
                ('category', models.CharField(choices=[('Sci-Fi', 'SCI-FI'), ('Fiction', 'FICTION'), ('Comedy', 'COMEDY')], default='Select', max_length=100)),
                ('content', models.FileField(upload_to='pdf/')),
            ],
        ),
    ]