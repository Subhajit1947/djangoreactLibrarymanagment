from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UseroutSerializer,BookSerializer,OrderSerializer
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .models import Books,Order
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

User=get_user_model()

class UserDetailAPI(APIView):
    
  
    def post(self, request, *args, **kwargs):
        data=request.data
        if not data["email"]:
            return Response({'message':'invalid email'},status=status.HTTP_403_FORBIDDEN)
        use1=User.objects.filter(username=data["email"]).first()
        if use1:
           return Response({'message':'email already exist'},status=status.HTTP_208_ALREADY_REPORTED)
        if not len(data["password"])>7:
            return Response({'message':'password is too sort'},status=status.HTTP_403_FORBIDDEN)
        if not data['phone']:
            return Response({'message':'phone no is required'},status=status.HTTP_403_FORBIDDEN)
        use2=User.objects.filter(phone=data["phone"]).first()
        if use2:
            return Response({'message':'phone no already exist'},status=status.HTTP_208_ALREADY_REPORTED)
        u=User.objects.create(username=data['email'],password=make_password(data['password']),
            name=data['name'],phone=data['phone'],college=data['college'],address=data['address'])
        
        u.save()
        serializer = UseroutSerializer(u)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class BookView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request,id=None):
        if id:
            book=Books.objects.filter(id=id).first()
            if not book:
                return Response({'message':f'id {id} not found'},status=status.HTTP_404_NOT_FOUND)
            s=BookSerializer(book)
            return Response(s.data)
        b=Books.objects.all()
        serializer=BookSerializer(b,many=True)
        return Response(serializer.data)
    
class OrderView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user=request.user
        o=Order.objects.select_related('user_id','book_id').filter(user_id__id=user.id).all()
        s=OrderSerializer(o,many=True)
        return Response(s.data)
    
    def post(self,request):
        data=request.data
        user=request.user
        b_id=data["id"]
        if not b_id:
            return Response({'message':'somthing went to wrong'},status=status.HTTP_403_FORBIDDEN)
         
        b=Books.objects.filter(id=b_id).first()
        if not b:
            return Response({'message':'somthing went to wrong'},status=status.HTTP_403_FORBIDDEN)
        if not user:
            return Response({'message':'unauthenticated'},status=status.HTTP_401_UNAUTHORIZED)
        o11=Order.objects.select_related('user_id','book_id').filter(user_id__id=user.id,book_id__id=b_id).first()
        if o11:
           return Response({'message':'this is already added'},status=status.HTTP_206_PARTIAL_CONTENT)
        o=Order.objects.create(user_id=user,book_id=b)
        o.save()
        s=OrderSerializer(o)
        return Response(s.data,status=status.HTTP_201_CREATED)
        

  




