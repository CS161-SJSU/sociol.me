from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

#User = settings.AUTH_USER_MODEL


# from authenticate.models

# Create your models here.
class SpotifyUser(models.Model):
    id = models.CharField(max_length=70, blank=False, default='', primary_key=True, unique=True)
    country = models.CharField(max_length=2, blank=False, default='')
    display_name = models.CharField(max_length=70, blank=False, default='')
    email = models.EmailField(max_length=254, blank=False, default='')
    href = models.CharField(max_length=50, blank=False, default='')
    followers = models.IntegerField(blank=False, default=0)
    access_token = models.CharField(max_length=2000, blank=False, default='')
    refresh_token = models.CharField(max_length=2000, blank=False, default='')
    image = models.CharField(max_length=2000, default='')

class SpotifyRecentlyPlayed(models.Model):
    user = models.ForeignKey(SpotifyUser, on_delete=models.CASCADE)
    song_title = models.CharField(max_length=70, blank=False, default='')
    artist_name = models.CharField(max_length=70, blank=False, default='')
    played_at = models.DateField()
    track_id = models.CharField(max_length=70, blank=False, default='', unique=True)
    image = models.CharField(max_length=200, blank=False, default='')
    track_url = models.CharField(max_length=200, blank=False, default='')
    preview_url = models.CharField(max_length=200, blank=False, default='')




