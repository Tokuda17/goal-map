from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from . import views


#Defines /api/ paths to make the API calls
urlpatterns = format_suffix_patterns([
    path('', views.api_root),
    path('events/',
        views.EventList.as_view(),
        name='events-list'),
    path('events/<int:pk>/',
        views.EventDetail.as_view(),
        name='event-detail'),
    path('users/',
        views.UserList.as_view(),
        name='user-list'),
    path('users/<int:pk>/',
        views.UserDetail.as_view(),
        name='user-detail'),
    path('signup/', 
         views.UserRegistrationView.as_view(), 
         name='user-signup'),
    path('users/login', 
         views.LoginView.as_view(), 
         name='login'),
])