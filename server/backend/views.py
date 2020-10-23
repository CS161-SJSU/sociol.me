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
        # token = request.data.get('tokenId')
        token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3OGFiMWRjNTkxM2Q5MjlkMzdjMjNkY2FhOTYxODcyZjhkNzBiNjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDEzODg5MzE3OTYyLXU3cnJhNDI4Z2NtMmEzaW4xaWppNWppYWYxcjRzbnRjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDEzODg5MzE3OTYyLXU3cnJhNDI4Z2NtMmEzaW4xaWppNWppYWYxcjRzbnRjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzOTkwOTc3NDgwMzIzODA1MjgyIiwiZW1haWwiOiJsZWVraW1idWk5MkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlNuT1QtcHd2UFRfQXhHWlRMVXRrRlEiLCJuYW1lIjoiTGVlIEtpbSIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLTVvMHVUNGp4RkpnL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y21PNWpxYkxVczVRRm5fTGw2T0NBc05YQ2ZHSXcvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkxlZSIsImZhbWlseV9uYW1lIjoiS2ltIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MDM0MDcyNzgsImV4cCI6MTYwMzQxMDg3OCwianRpIjoiZjRlMjM2N2Y5MWQ4Y2M3ZjE1Y2ZjMThhZWZiNWU4NTI2NGEyMGJkNiJ9.MYyA94K4OQWZhA58EaI32uHX6f5geWkhRDmenTFAaEbsPCGLCY3XzW0BIo9gfxPEqlicDYPstnFoRTPVxnowJPGx57utxizrSePXjwEjcZrE-KPT456XSJTKCOhztwA1XvAmYa5Td137G0nU4hypbe8NZ9GU_VU0b--z7z7vXpwrRUrsg3ox6IntvHa2r6CckxYICnHgMQaRVLGSqL73YHD9ufysnu4QfM7lLWmQmnaIgeJi2kqkQdTifPBXMcb41xtGI2iZ7eNqZ4cQut-0Vx5V52x0wzDERrEvd-rVWrr9ns-hYXIK2ig5cKDYFbHAb-65xle-YqNCpsoEKi1EYg"

        try:
            print("try")
            CLIENT_ID = os.environ.get('CLIENT_ID')
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            print(idinfo)

            # ID token is valid. Get the user's Google Account ID from the decoded token.
            userid = idinfo['sub']
    
            response = httprequest.get("https://oauth2.googleapis.com/tokeninfo?id_token=" + token)
            print(response.json())

            return Response({'message': 'Google ID info OK!'}, status=status.HTTP_202_ACCEPTED)

        except ValueError:
            # Invalid token
            print("Value Error")
            # return Response({'message': 'Google ID info is wrong!'})
            return Response({'message': 'Google ID info is wrong!'}, status=status.HTTP_401_UNAUTHORIZED)
    

    print("POST failed")
    # return Response({'message': 'Google sign in failed!'})
    return Response({'message': 'Google sign in failed!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
