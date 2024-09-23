from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello World. This is the Event Index")

def tester(requet):
    return HttpResponse("Hello Tester")