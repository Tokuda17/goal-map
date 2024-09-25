from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Event  # Assuming you have an Event model
from .serializers import EventSerializer  # Make sure you have a serializer

@api_view(['POST'])
def create_event(request):
    if request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
