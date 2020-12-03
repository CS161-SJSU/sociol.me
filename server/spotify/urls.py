from django.conf.urls import url 
from spotify import views
from django.conf import settings
 
urlpatterns = [
    url(r'^spotify/login/', views.spotify_login),
    url(r'^spotify/callback/$', views.spotify_callback),
    url(r'^spotify/me/$', views.spotify_me),
    url(r'^spotify/refresh/$', views.spotify_refresh),
    url(r'^spotify/update_email/', views.get_spotify_update_email),
    url(r'^spotify/recently_played/', views.recently_played),
    url(r'^spotify/get_recently_played/', views.get_recently_played),
    url(r'^spotify/top_artists_long/', views.top_artist_long),
    url(r'^spotify/top_artists_medium/', views.top_artist_medium),
    url(r'^spotify/top_artists_short/', views.top_artist_short),
    url(r'^spotify/get_top_artists_long/', views.get_top_artist_long),
    url(r'^spotify/get_top_artists_medium/', views.get_top_artist_medium),
    url(r'^spotify/get_top_artists_short/', views.get_top_artist_short),
    url(r'^spotify/top_tracks_long/', views.top_track_long),
    url(r'^spotify/top_tracks_medium/', views.top_track_medium),
    url(r'^spotify/top_tracks_short/', views.top_track_short),
    url(r'^spotify/get_top_tracks_long/', views.get_top_track_long),
    url(r'^spotify/get_top_tracks_medium/', views.get_top_track_medium),
    url(r'^spotify/get_top_tracks_short/', views.get_top_track_short),
]
