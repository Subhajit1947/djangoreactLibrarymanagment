from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView
urlpatterns = [
    path('register/',views.UserDetailAPI.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('books/',views.BookView.as_view()),
    path('books/<int:id>',views.BookView.as_view()),
    path('order/',views.OrderView.as_view()),
]