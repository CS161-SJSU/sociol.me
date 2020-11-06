from django.db import models
from django.contrib.auth.models import AbstractUser 
#from authenticate.models

# Create your models here.
class TwitterModel(models.Model):
    #email = models.ForeignKey(max_length=70, blank=False, on_delete=models.CASCADE)
    email = models.CharField(max_length=70, blank=False, default='')
    name = models.CharField(max_length=70, blank=False, default='')
    user_id = models.IntegerField(blank=False, default=0, primary_key=True, unique=True)
    screen_name = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=1000, blank=False, default='')
    followers_count =  models.IntegerField(blank=False, default=0)
    friends_count = models.IntegerField(blank=False, default=0)
    auth_token =  models.CharField(max_length=2000, blank=False, default='')
    auth_token_secret = models.CharField(max_length=2000, blank=False, default='')
    #worst_tweet = models.IntegerField(blank=False, default=0)
    #best_tweet = models.IntegerField(blank=False, default=0)
