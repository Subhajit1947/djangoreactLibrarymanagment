from django.db import models

# Create your models here.
from django.db import models
from datetime import datetime
# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
class MyUser(AbstractUser):
    username= models.EmailField(unique=True)
    name=models.CharField(max_length=100,null=False)
    phone=models.IntegerField(unique=True,null=False)
    address=models.TextField(max_length=100,null=False)
    college=models.CharField(max_length=50,null=False)
    created_at=models.DateTimeField(default=datetime.utcnow) 

    REQUIRED_FIELDS = ['address', 'phone','college','name']
    USERNAME_FIELD = 'username'
    
class Books(models.Model):
    book_name=models.CharField(max_length=100,null=False)
    choise_category=(
        ('Sci-Fi','SCI-FI'),
        ('Fiction','FICTION'),
        ('Comedy','COMEDY')
    )
    category=models.CharField(max_length=100,choices=choise_category,default='Select')
    content=models.FileField(upload_to='pdf/')

User=get_user_model()
class Order(models.Model):
    user_id=models.ForeignKey(User,on_delete=models.CASCADE)
    book_id=models.ForeignKey(Books,on_delete=models.CASCADE)
    created_at=models.DateTimeField(default=datetime.utcnow)
