from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()


    def __str__(self):
        return f"{self.name} on {self.date} from {self.start_time} to {self.end_time}"
