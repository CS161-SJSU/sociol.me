from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from twitter.models import TwitterModel
from twitter.models import TwitterTopWorst
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
from django.core import serializers


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
    
    return Response({"user": user_twitter_info}, status=status.HTTP_202_ACCEPTED)


@api_view(['POST','GET'])
def top_worst(request):
    email = request.data.get('email')

    print(email)
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)
# find user with that email
    try:
        print("try to get the email")
        twitter_user_model = TwitterModel.objects.get(email=email)

        consumer_key = os.environ.get('TWITTER_ID')
        consumer_secret = os.environ.get('TWITTER_SECRET')
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(twitter_user_model.auth_token, twitter_user_model.auth_token_secret)
        api = tweepy.API(auth, wait_on_rate_limit = True)
    
        print("this is the api: ")
        print(api)

        user_info_dict = api.me()
        user_id = user_info_dict.id
        print("User ID: ", user_id)

        print("try timeline")
        
        count = 2000
        public_tweets = api.user_timeline(user_id, count = count, include_rts = False)
        # check for the top and worst tweet of the user in DB
        try:
            twitter_object = TwitterTopWorst.objects.filter(user_twitter_id = twitter_user_model).delete()
            # if it exist, delete them all
            print("delete the old tweets")
        except TwitterModel.DoesNotExist:
            print("no old tweets in DB")
        
        print("Either case, create new top worst tweets of the user")

        print("----------This is the top best 5 tweets: --------------")
        
        sorted_tweets = sorted(public_tweets, key=lambda x: x.retweet_count, reverse=True)[:5]
        tweet_index = 1
        for sorted_tweet in sorted_tweets:
            twitter_object = TwitterTopWorst.objects.create(tweet_id = sorted_tweet.id, name = sorted_tweet.user.name,
            screen_name = sorted_tweet.user.screen_name, retweet_count = sorted_tweet.retweet_count,
            text = sorted_tweet.text, favorite_count = sorted_tweet.favorite_count, tweet_index = tweet_index, user_twitter_id = twitter_user_model)
            tweet_index = tweet_index + 1
            print(twitter_object)

        print("------------This is the worst 5 tweets: ---------------")

        tweet_index = 10
        sorted_tweets = sorted(public_tweets, key=lambda x: x.retweet_count, reverse=False)[:5]
        for sorted_tweet in sorted_tweets:
            twitter_object = TwitterTopWorst.objects.create(tweet_id = sorted_tweet.id, name = sorted_tweet.user.name,
            screen_name = sorted_tweet.user.screen_name, retweet_count = sorted_tweet.retweet_count,
            text = sorted_tweet.text, favorite_count = sorted_tweet.favorite_count, tweet_index = tweet_index, user_twitter_id = twitter_user_model)
            tweet_index = tweet_index - 1
            print(twitter_object)


        return Response({'message': 'timeline is perfect!'}, status=status.HTTP_202_ACCEPTED)

    except Exception as e:
        print("error: ", e)
        return Response({'message': 'timeline failed!'}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({'message': 'topworst failed!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_top_worst(request):
    email = request.GET.get('email')
    #auth_token = request.data.get('auth_token')
    print(email)
    #print(auth_token)
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = TwitterModel.objects.get(email = email)
    if user.email != email:
        return Response({"err": "invalid email"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    tweets = TwitterTopWorst.objects.filter(user_twitter_id__in = TwitterModel.objects.filter(email = email))
    
    twitter_info = serializers.serialize('json', tweets)
    print(tweets)

    responses = []
    for tweet in tweets:
        response = {
            "tweet_index": tweet.tweet_index,
            "tweet_id": tweet.tweet_id,
            "text": tweet.text,
            "retweet_count": tweet.retweet_count,
            "favorite_count": tweet.favorite_count, 
        }
        responses.append(response)
    
    return Response({"topworst": responses} , status=status.HTTP_202_ACCEPTED)