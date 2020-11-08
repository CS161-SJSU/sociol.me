from django.shortcuts import render
from django.http import HttpResponseRedirect
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
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()
import requests as httprequest
import os
import tweepy
import json
import webbrowser
import time


mongo_client = MongoClient('mongodb://localhost:27017')

# Create your views here.
@api_view(['POST','GET'])
def twitter_authenticate(request):
    consumer_key = os.environ.get('TWITTER_ID')
    print(consumer_key)
    consumer_secret = os.environ.get('TWITTER_SECRET')
    print(consumer_secret)
    
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

    try:
        redirect_url = auth.get_authorization_url()
        print("--- redirect_url", redirect_url)
    except tweepy.TweepError:
        print("Error! Failed to get request token.")

    webbrowser.open(redirect_url)                

    return Response({'message': 'error authenticating twitter'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST', 'GET'])
def verify(request): 
    email = request.data.get('email')
    print(email)
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    token = request.data.get('oauth_token')
    verifier = request.data.get('oauth_verifier')
    print(token)
    print (verifier)
    consumer_key = os.environ.get('TWITTER_ID')
    print(consumer_key)
    consumer_secret = os.environ.get('TWITTER_SECRET')
    print(consumer_secret)
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

    auth.request_token = { 'oauth_token' : token, 'oauth_token_secret' : verifier }
    print("---", auth.request_token)

    auth.get_access_token(verifier)

    
    auth_token = auth.access_token
    print("hello Access token", auth_token)
    auth_token_secret = auth.access_token_secret
    print("hello Access token secret",auth_token_secret)

    auth.set_access_token(auth_token, auth_token_secret)

    api = tweepy.API(auth, wait_on_rate_limit = True)

    user_info_dict = api.me()
    user_id = user_info_dict.id
    print("step 5", user_id)
    name = user_info_dict.name
    print("step 6", name)
    screen_name = user_info_dict.screen_name
    print("step 7", screen_name)
    followers_count = user_info_dict.followers_count
    print("step 8", followers_count)
    friends_count = user_info_dict.friends_count
    print("step 9", friends_count)
    description = user_info_dict.description
    print("step 10", description)

    try:
        twitter_user = TwitterModel.objects.get(user_id = user_id, email = email)
        twitter_user.followers_count = followers_count
        twitter_user.friends_count = friends_count
        twitter_user.auth_token = auth_token
        twitter_user.auth_token_secret = auth_token_secret
        twitter_user.description = description
        twitter_user.screen_name = screen_name
        twitter_user.name = name
        twitter_user.save()
        print("update db")
    except TwitterModel.DoesNotExist:
        twitter_user_model = TwitterModel.objects.create(email = email, name = name, user_id = user_id, screen_name = screen_name, description = description, 
        followers_count = followers_count, friends_count = friends_count, auth_token = auth_token, auth_token_secret = auth_token_secret)
        print("make new document")
    #print("no twitter model problem")
    #send back to frontend auth_token, screen_name, name

    user_twitter_info = {
        'auth_token': auth_token, 
        'screen_name': screen_name,
        'name': name,
        'user_id' : user_id,
        'followers_count' : followers_count,
        'friends_count' : friends_count,
        'description' : description,
        'auth_token' : auth_token
    }

    print(user_twitter_info)
    
    try:
        info_json = json.dumps(user_twitter_info)
        print(info_json)
    except Exception as e:
        print("error: ", e)
    
    return Response(user_twitter_info, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
def get_twitter_info(request): 
    email = request.GET.get('email')
    #auth_token = request.data.get('auth_token')
    print(email)
    #print(auth_token)
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    twitter_user_info = TwitterModel.objects.get(email = email)
    if twitter_user_info.email != email:
        return Response({"err": "invalid email"}, status=status.HTTP_406_NOT_ACCEPTABLE)


    user_twitter_info = {
        'auth_token': twitter_user_info.auth_token, 
        'screen_name': twitter_user_info.screen_name,
        'name': twitter_user_info.name,
        'user_id' : twitter_user_info.user_id,
        'followers_count' : twitter_user_info.followers_count,
        'friends_count' : twitter_user_info.friends_count,
        'description' : twitter_user_info.description
    }

    print(user_twitter_info)
    
    return Response(user_twitter_info, status=status.HTTP_202_ACCEPTED)









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