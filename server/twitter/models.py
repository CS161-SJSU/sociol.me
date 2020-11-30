from django.db import models
from django.contrib.auth.models import AbstractUser 

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
    statuses_count = models.IntegerField(blank=False, default=0)
    auth_token =  models.CharField(max_length=2000, blank=False, default='')
    auth_token_secret = models.CharField(max_length=2000, blank=False, default='')
    

class TwitterTopWorst(models.Model):
    tweet_id = models.IntegerField(blank=False, default=0, primary_key=True, unique=True)
    name = models.CharField(max_length=70, blank=False, default='')
    screen_name = models.CharField(max_length=70, blank=False, default='')
    retweet_count = models.IntegerField(blank=False, default=0)
    text = models.CharField(max_length=280, blank=False, default='')
    favorite_count = models.IntegerField(blank=False, default=0)
    # if true -> top tweet, false -> worst tweet
    tweet_index = models.IntegerField(blank=False, default=0)
    # to link the tweet to the user_id
    user_twitter_id = models.ForeignKey(TwitterModel, on_delete=models.CASCADE)
