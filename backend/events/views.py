from django.http import HttpResponse, Http404
from django.template import loader
from django.shortcuts import get_object_or_404, render

from .models import Event


def index(request):
    events = Event.objects.all()
    print(events)
    
    return render(request, "events/index.html", {"events": events})

def tester(requet):
    return HttpResponse("Hello Tester")
