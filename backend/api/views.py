from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]

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

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the new user
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET"])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'events': reverse('event-list', request=request, format=format)
    })




    
