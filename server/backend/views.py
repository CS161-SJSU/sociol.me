# Create your views here.
from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from backend.models import GoogleSignIn
from backend.serializers import GoogleSignInSerializer
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
def to_servers(request):
    servers = GoogleSignIn.objects
    
    if request.method == 'POST': 
        print("if")
        token = request.data.get('tokenId')

        try:
            print("try")
            CLIENT_ID = os.environ.get('CLIENT_ID')
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            print(idinfo)

            response = httprequest.get("https://oauth2.googleapis.com/tokeninfo?id_token=" + token)
            
            # email = idinfo['email']
            # firstName = idinfo['given_name']
            # lastName = idinfo['family_name']
            # fullName = idinfo['name']
            # imageUrl = idinfo['picture']
            # googleId = idinfo['sub']

            user = GoogleSignIn(email = idinfo['email'], firstName = idinfo['given_name'], lastName = idinfo['family_name'], 
                                fullName = idinfo['name'], imageUrl = idinfo['picture'],
                                googleId = idinfo['sub'], tokenId = token)
            user.save()
            return Response({'message': 'Google ID info OK!'}, status=status.HTTP_202_ACCEPTED)
            
        except ValueError:
            # Invalid token
            print("Value Error")
            return Response({'message': 'Google ID info is wrong!'}, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response({'message': 'Google sign in failed!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
