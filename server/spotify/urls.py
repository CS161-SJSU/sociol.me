from django.conf.urls import url 
from spotify import views 
 
urlpatterns = [ 
    url(r'^spotifyAuth/', views.spotify_auth),
    url(r'^spotify/login/', views.spotify_login),
    url(r'^spotify/callback/$', views.spotify_callback),
    url(r'^spotify/me/$', views.spotify_me),
    url(r'^spotify/refresh/$', views.spotify_refresh),
]
