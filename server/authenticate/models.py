from django.db import models
from django.contrib.auth.models import AbstractUser 
from .manager import UserManager 
from .validators import validate_email, validate_name, validate_password

class User(AbstractUser):
    username = None 
    email = models.CharField(max_length=70, unique = True, blank=False, default='', validators=[validate_email])
    password = models.CharField(max_length = 128, blank=False, default='', validators=[validate_password])
    first_name = models.CharField(max_length=70, blank=False, default='', validators=[validate_name])
    last_name = models.CharField(max_length=70, blank=False, default='', validators=[validate_name])
    full_name = models.CharField(max_length=70, blank=False, default='')
    image_url = models.CharField(max_length=200, blank=False, default='')
    google_id = models.CharField(max_length=70, blank=False, default='')
    token_id = models.CharField(max_length=2000, blank=False, default='')

    # Username field is now email
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    # All Users object will have to be created by UserMananger
    objects = UserManager()
    
    def __str__(self):
        return self.email