from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.response import Response
from rest_framework import status, mixins, generics, permissions
from rest_framework import renderers
from rest_framework.views import APIView
from rest_framework.reverse import reverse


from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

from .models import Event
from .serializers import EventSerializer
from .serializers import UserSerializer
from .serializers import UserRegistrationSerializer
from .permissions import IsOwnerOrReadOnly


class EventList(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]  # Ensure token auth
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]  # User must be authenticated

    def get_queryset(self):
        # Return only events that belong to the authenticated user
        user = self.request.user
        return Event.objects.filter(owner=user)

    serializer_class = EventSerializer

    def perform_create(self, serializer):
        # Automatically associate the logged-in user with the event
        serializer.save(owner=self.request.user)

    
class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def perform_destroy(self, instance):
        if instance.owner != self.request.user:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        instance.delete()
        return Response({"Delete": True}, status=status.HTTP_200_OK)

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]

    #Checks to see if username and password exist in the DB
    def post(self, request, format=None):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # Generate or retrieve the token
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            # Return an error response if the credentials are invalid
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = []  # Allow any user to sign up

    #post attempts to create a new user
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the new user
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        
        #Return Error is user cannot be added 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET"])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'events': reverse('event-list', request=request, format=format)
    })




    
