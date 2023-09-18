from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Books,Order
User=get_user_model()

    
class UseroutSerializer(serializers.ModelSerializer):
    class Meta:
        model =User
        fields = ["id","name", "username","phone","address","college","created_at"]

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model=Books
        fields='__all__'

class OrderSerializer(serializers.ModelSerializer):
    user_id=UseroutSerializer()
    book_id=BookSerializer()
    class Meta:
        model=Order
        fields=['id','user_id','book_id','created_at']


