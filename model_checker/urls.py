from django.conf.urls import url
from model_checker.views import home

urlpatterns = [
    url(r'^$', home, name='home')
]
