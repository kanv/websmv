from django.conf.urls import url
from api.views import run_simulation, run_verification

urlpatterns = [
    url(r'^simulate/$', run_simulation, name='run_simulation'),
    url(r'^verify/$', run_verification, name='run_verification')
    # todo: Add flags to url
]
