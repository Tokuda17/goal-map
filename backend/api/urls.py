from django.urls import path
from . import views

urlpatterns = [
    path('events/', views.create_event, name='create_event'),
]
