# Create your views here.
from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from authenticate.models import User
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response

from google.oauth2 import id_token
from google.auth.transport import requests
import requests as httprequest
import os
from dotenv import load_dotenv
load_dotenv()

# SSO try out
# https://developers.google.com/identity/sign-in/web/backend-auth

@api_view(['POST','GET'])
def to_authenticate(request):
    # TODO: User already exist
    
    if request.method == 'POST': 
        token = request.data.get('tokenId')

        try:
            # validating token
            CLIENT_ID = os.environ.get('CLIENT_ID')
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

            response = httprequest.get("https://oauth2.googleapis.com/tokeninfo?id_token=" + token)
            
            # SSO is valid, now search for the user by email in the DB
            try:
                # if user exist, update the token
                user = User.objects.get(email=idinfo['email'])
                user.token_id = token
            except User.DoesNotExist:
                # new user created
                user = User.objects.create_user(email = idinfo['email'], password = token, first_name = idinfo['given_name'], 
                                    last_name = idinfo['family_name'], full_name = idinfo['name'], image_url = idinfo['picture'],
                                    google_id = idinfo['sub'], token_id = token)
            # both cases, it will be accepted
            return Response({'message': 'Google ID info OK!'}, status=status.HTTP_202_ACCEPTED)
            
        except ValueError:
            # Invalid token
            print("Value Error")
            return Response({'message': 'Google ID info is wrong!'}, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response({'message': 'Google sign in failed!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
