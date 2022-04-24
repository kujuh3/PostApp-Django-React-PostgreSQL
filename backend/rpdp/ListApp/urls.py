from django.conf.urls import url
from ListApp import views

urlpatterns=[
    url(r'^posts$', views.postApi),
    url(r'^post/([0-9]+)$',views.postApi),

    url(r'^posters$', views.posterApi),
    url(r'^poster/([0-9]+)$',views.posterApi),
]