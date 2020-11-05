from django.db import models
from django.contrib.auth.models import AbstractUser 
#from authenticate.models

# Create your models here.
class SpotifyModel(models.Model):
    email = models.CharField(max_length=70, blank=False, default='')