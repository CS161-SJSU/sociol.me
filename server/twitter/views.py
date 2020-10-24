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


# Create your views here.
@api_view(['POST','GET'])
def twitter_get_token(request):  #call this for initial setup
    
    if request.method == 'POST': 
        print("if")
        oauth_token = request.data.get('oauth_token')
        oauth_verifier = request.data.get('oauth_verifier')
        user_email = request.data.get('email')

        try:
            print("try")

            url = "https://api.twitter.com/oauth/access_token"
            post_data = [('oauth_token', oauth_token), ('oauth_verified', oauth_verifier)]
            response = httprequest.post(url, post_data)
            print(response.json())
            #save these info to the DB
            #oauth_token=6253282-eWudHldSbIaelX7swmsiHImEL4KinwaGloHANdrY
            #oauth_token_secret=2EEfA6BG5ly3sR3XjE0IBSnlQu4ZrUzPiYTmrkVU
            #user_id=6253282
            #screen_name=twitterapi
            #save oauth_verifier
            #save (gmail)email as well

            #call verify credentials

            return Response({'message': 'twitter token verified!'}, status=status.HTTP_202_ACCEPTED)

        except ValueError:
            # Invalid token
            print("Value Error")
            return Response({'message': 'twitter token invalid!'}, status=status.HTTP_401_UNAUTHORIZED)
    

    print("POST failed")
    return Response({'message': 'twitter sign in failed!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def twitter_verify_credentials(request):
    
    #db has to reference the gmail
    #send back a gmail and token, our app token (to be implemented)

    if request.method == 'GET': 
        print("if")
        user_email = request.data.get('email')
        
        #what response to store to DB
        """
        description
        favourite_counts
        follow_request_sent
        followers_counts
        following
        friends_count
        location
        name
        profile_image_url_https
        screen_name
        created_at
        """

        #if email sent was empty
            #return error

        try: 
            #get oauth token from DB based on email
        
        except ValueError: #handle db exceptions
            #return error

        try:
            print("try")

            url = "https://api.twitter.com/1.1/account/verify_credentials.json"
            response = httprequest.get(url + oauth)
            print(response.json())

            return Response({'message': 'twitter credentials verified!'}, status=status.HTTP_202_ACCEPTED)

        except ValueError:
            # Invalid token
            print("Value Error")
            return Response({'message': 'twitter credentials invalid!'}, status=status.HTTP_401_UNAUTHORIZED)
    

    print("POST failed")
    return Response({'message': 'twitter verify credentials failed!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
