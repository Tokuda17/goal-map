from django.db import models
from django.contrib.auth.models import User


#Define our Event Model 
# owner: User
# name: String
# Date: String (YYYY-MM-DD)
# start_time: String (HH:MM:SS)
# end_time: String (HH:MM:SS)
class Event(models.Model):
    owner = models.ForeignKey('auth.User', related_name="event", on_delete=models.CASCADE, default=1)
    name = models.CharField(max_length=255)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.name} on {self.date} from {self.start_time} to {self.end_time}"
