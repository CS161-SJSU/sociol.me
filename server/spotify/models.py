from django.db import models
from django.contrib.auth.models import AbstractUser 
#from authenticate.models

# Create your models here.
class SpotifyModel(models.Model):
    country = models.CharField(max_length=2, blank=False, default='')   
    display_name = models.CharField(max_length=70, blank=False, default='') 
    email = models.CharField(max_length=70, blank=False, default='')
    id = models.IntegerField(blank=False, default=0, primary_key=True)
    href = models.CharField(max_length=50, blank=False, default='')
    followers =  models.IntegerField(blank=False, default=0)
