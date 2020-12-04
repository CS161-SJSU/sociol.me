from django.test import TestCase
from django.test import SimpleTestCase
import json
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from rest_framework import status
from .models import SpotifyUser


# Create your tests here.

class SpotifyTestCases(APITestCase):

    def setUp(self):
        self.loginUrl = reverse('login')


        self.email = 'test@gmail.com'
        self.id = 'testUser'
        self.followers = 1
        self.user = SpotifyUser.objects.create(email=self.email, id=self.id,
                                               followers=self.followers)

    def test_login(self):
        res = self.client.post(self.loginUrl)
        self.assertEqual(res.status_code, 400)

