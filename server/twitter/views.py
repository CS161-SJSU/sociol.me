from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from twitter.models import TwitterModel
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response


from google.oauth2 import id_token
from google.auth.transport import requests
from dotenv import load_dotenv
load_dotenv()
import requests as httprequest
import os
import tweepy
import json
import webbrowser
import time


# Create your views here.
@api_view(['POST','GET'])
def twitter_authenticate(request):
    if request.method == 'POST':
        try:
            user_email = request.data.get('email')
            #print(user_email)
            #if user_email is None:
            #    return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

            #user = User_Model.objects.filter(email=user_email)

            consumer_key = os.environ.get('TWITTER_ID')
            #print(consumer_key)
            consumer_secret = os.environ.get('TWITTER_SECRET')
            #print(consumer_secret)
        
            #async await?????
            #in case of fail, return 401
            
            auth = tweepy.OAuthHandler(consumer_key, consumer_secret, 'oob')
            redirect_url = auth.get_authorization_url()
            webbrowser.open(redirect_url)

            verifier = input('Verifier:')
            #print("verifier ========", verifier)
            #token = session.get('request_token')
            #print("token  ========", token)
            #session.delete('request_token')

            # auth.request_token = { 'oauth_token' : token,
            #             'oauth_token_secret' : verifier }
            # print("auth ========", auth)

            try:
                auth.get_access_token(verifier)
            except tweepy.TweepError:
                print('Error! Failed to get access token.')

            auth_token = auth.access_token
            #print(auth_token)
            auth_token_secret = auth.access_token_secret
            #print(auth_token_secret)

            #show worst tweet
            #show best tweet

            auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
            #print("step 1", auth)
            auth.set_access_token(auth_token, auth_token_secret)
            #print("step 2", auth)

            api = tweepy.API(auth, wait_on_rate_limit = True)
            #print("step 3", api)

            user_info_dict = api.me()
            #print(type(user_info_dict))
            #print("step 4", user_info_dict)
            user_id = user_info_dict.id
            #print("step 5", user_id)
            name = user_info_dict.name
            #print("step 6", name)
            screen_name = user_info_dict.screen_name
            #print("step 7", screen_name)
            followers_count = user_info_dict.followers_count
            #print("step 8", followers_count)
            friends_count = user_info_dict.friends_count
            #print("step 9", friends_count)
            description = user_info_dict.description
            #print("step 10", description)

            twitter_user_model = TwitterModel.objects.create(email = user_email, name = name, user_id = user_id, screen_name = screen_name, description = description, 
            followers_count = followers_count, friends_count = friends_count, auth_token = auth_token, auth_token_secret = auth_token_secret)

            #print("no twitter model problem")
            #send back to frontend auth_token, screen_name, name

            info_dict = {
                'auth_token': auth_token, 
                'screen_name': screen_name,
                'name': name,
                'user_id' : user_id,
                'followers_count' : followers_count,
                'friends_count' : friends_count,
                'description' : description,
                'auth_token' : auth_token
            }

            #print(info_dict)
            
            try:
                info_json = json.dumps(info_dict)
                #print(info_json)
            except Exception as e:
                print("error: ", e)
            
            return Response({info_json}, status=status.HTTP_202_ACCEPTED)
        
        except:
            return Response({'message': 'twitter authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({'message': 'error authenticating twitter'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
'''
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
'''