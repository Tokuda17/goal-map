from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Event


#Create Serializers to ensure that Data passed in is valid 

class EventSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    class Meta:
        model = Event
        fields = ['url', "id", 'owner', 'name', 'date', 'start_time', 'end_time']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    events = serializers.HyperlinkedRelatedField(many=True, view_name="event-detail", read_only=True)
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'events']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        # Create the user with the hashed password
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user

