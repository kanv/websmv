from django.shortcuts import render
from model_checker.templates.main import main_request_handler
from django.template import RequestContext


def home(request):
    context = main_request_handler(request)
    return render(request, 'main.html', context, RequestContext(request))
