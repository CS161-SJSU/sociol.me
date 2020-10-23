from django.db import models

# Create your models here.

class GoogleSignIn(models.Model):
    email = models.CharField(max_length=70, blank=False, default='')
    firstName = models.CharField(max_length=70, blank=False, default='')
    lastName = models.CharField(max_length=70, blank=False, default='')
    fullName = models.CharField(max_length=70, blank=False, default='')
    imageUrl = models.CharField(max_length=200, blank=False, default='')
    googleId = models.CharField(max_length=70, blank=False, default='')
    tokenId = models.CharField(max_length=2000, blank=False, default='')