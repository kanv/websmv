from django.conf.urls import include, url

urlpatterns = [
    url(r'^$', include('model_checker.urls')),
    url(r'^api/', include('api.urls'))
]
