from django.test import TestCase
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
import django.core.exceptions as exceptions
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
import django.db as dbexceptions
from .models import User
# from .forms import UserValidationForm
# Create your tests here.

class UserTestCases(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', password='foo')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="foo")

    def test_duplicate_accounts(self):
        User.objects.create_user(email="normal@user.com", password="foo")
        with self.assertRaises(dbexceptions.IntegrityError) as exception_manager:
            User.objects.create_user(email="normal@user.com", password="oof")