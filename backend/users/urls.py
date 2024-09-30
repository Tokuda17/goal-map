# urls.py
from django.urls import path
from .views import signup
from .views import login

urlpatterns = [
    path('api/signup/', signup, name='signup'),
    path('api/login/', login, name='login'),
]
