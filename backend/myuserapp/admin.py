from django.contrib import admin
from .models import MyUser,Books,Order
# Register your models here.
admin.site.register(MyUser)
admin.site.register(Books)
admin.site.register(Order)
