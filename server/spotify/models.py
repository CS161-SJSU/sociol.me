from django.db import models
from django.contrib.auth.models import AbstractUser


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
