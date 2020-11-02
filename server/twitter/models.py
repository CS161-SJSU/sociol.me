from django.db import models

# Create your models here.
class TwitterModel(models.Model):
    email = models.ForeignKey(max_length=70, blank=False, default='')
    name = models.CharField(max_length=70, blank=False, default='')
    id = models.IntegerField(max_length=70, blank=False, default='')
    screen_name = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=1000, blank=False, default='')
    followers_count =  models.IntegerField(max_length=70, blank=False, default='')
    friends_count = models.IntegerField(max_length=70, blank=False, default='')
    auth_token =  models.CharField(max_length=2000, blank=False, default='')
    auth_token_secret = models.CharField(max_length=2000, blank=False, default='')