from django.conf.urls import url 
from spotify import views
from django.conf import settings
 
urlpatterns = [
    url(r'^spotify/login/', views.spotify_login),
    url(r'^spotify/callback/$', views.spotify_callback),
    url(r'^spotify/me/$', views.spotify_me),
    url(r'^spotify/refresh/$', views.spotify_refresh),
    url(r'^spotify/update_email/', views.get_spotify_update_email),
]
