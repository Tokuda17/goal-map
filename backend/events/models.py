from django.db import models

# Create your models here.

class Event(models.Model):
    description = models.CharField(max_length=200)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
