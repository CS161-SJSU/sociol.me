import webbrowser

from django.shortcuts import render

from django.http.response import JsonResponse, HttpResponseRedirect
from rest_framework.parsers import JSONParser
from rest_framework import status

from django.shortcuts import redirect
from authenticate.models import User
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
import requests
import os
import json
import secrets
import string
import pandas
import numpy

from dotenv import load_dotenv

load_dotenv()
from django.shortcuts import render
from urllib.parse import urlencode
import base64
import datetime

from spotify.models import SpotifyUser
from spotify.models import SpotifyRecentlyPlayed

# Client info
CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
REDIRECT_URI = os.getenv('SPOTIFY_REDIRECT_URI')

# Spotify API endpoints
AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
ME_URL = 'https://api.spotify.com/v1/me'

FRONTEND_URI = 'http://localhost:3000/setup/'

# API STATS ENDPOINTS
RECENTLY_PLAYED = 'https://api.spotify.com/v1/me/player/recently-played'


@api_view(['POST'])
def recently_played(request):
    email = request.data.get('email')
    print("Email", email)

    try:
        SpotifyUser.objects.get(email=email)
        spotify_user_model = SpotifyUser.objects.get(email=email)
        print("USER MODEL", spotify_user_model)
        access_token = spotify_user_model.access_token
        print("ACCESS TOKEN ", access_token)

        print("INSIDE RECENTLY PLAYED")

        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer {token}".format(token=access_token)
        }

        today = datetime.datetime.now()
        yesterday = today - datetime.timedelta(days=1)  # We want to run the feed daily, last 24 hours played songs
        yesterday_unix_timestamp = int(yesterday.timestamp()) * 1000

        # print("PRINT THE CALL ")
        # print(RECENTLY_PLAYED + '?after={time}'.format(time=yesterday_unix_timestamp))

        # r = requests.get("https://api.spotify.com/v1/me/player/recently-played?limit=20&after=0", headers=headers)
        r = requests.get(RECENTLY_PLAYED + '?limit=20&after={time}'.format(time=yesterday_unix_timestamp),
                         headers=headers)

        data = r.json()

        print("SPOTIFY USER ID ", spotify_user_model.id)

        try:
            spotify_deleted = SpotifyRecentlyPlayed.objects.filter(user=spotify_user_model.id).delete()
            print("DELETED STUFF ", spotify_deleted)

        except SpotifyRecentlyPlayed.DoesNotExist:
            print("User has no previous playlists in the DB")

        # print("Recently played data: ", data)

        song_titles = []
        artist_names = []
        played_at_list = []
        timestamps = []
        track_id = []

        if not data.items:
            return Response({'message': "No Recently Played Tracks"})

        for song in data["items"]:
            song_titles.append(song["track"]["name"])
            artist_names.append(song["track"]["album"]["artists"][0]["name"])
            played_at_list.append(song["played_at"])
            timestamps.append(song["played_at"][0:10])
            track_id.append(song["track"]["id"])

            try:
                print("INSIDE TRY")
                SpotifyRecentlyPlayed.objects.get(track_id=song["track"]["id"]).delete()
                print("ADD +1 played EDGE CASE")

            except SpotifyRecentlyPlayed.DoesNotExist:
                print("No OLD TRACKS")

            spotify_recently_played = SpotifyRecentlyPlayed.objects.create(user=spotify_user_model,
                                                                           song_title=song["track"]["name"],
                                                                           artist_name=
                                                                           song["track"]["album"]["artists"][0][
                                                                               "name"],
                                                                           played_at=song["played_at"][0:10],
                                                                           track_id=song["track"]["id"])

            print("SPOTIFY DB OBJ ", spotify_recently_played)

        recently_played_dict = {
            "song_title": song_titles,
            "artist_name": artist_names,
            "played_at": played_at_list,
            "timestamp": timestamps,
            "track_id": track_id
        }

        # Saving into Pandas dataframe in order to show in table format
        dataframe = pandas.DataFrame(recently_played_dict,
                                     columns=["song_title", "artist_name", "played_at", "timestamp", "track_id"])

        print(dataframe)

        # print(recently_played_dict )
        return Response({'message': data})

    except SpotifyUser.DoesNotExist:
        return Response({"message": "Email is not in the DB"})


@api_view(['GET'])
def get_recently_played(request):
    email = request.data.get('email')
    # auth_token = request.data.get('auth_token')
    print("Inside get method, email is : ", email)
    # print(auth_token)
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    # Find the user thru email first then find their ID, since other users might have similar ids?

    spotify_user = SpotifyUser.objects.get(email=email)
    if spotify_user.email != email:
        return Response({"err": "invalid email"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    print("Spotify user is: ", spotify_user)

    spotify_id = spotify_user.id

    print("Spotify ID is: ", spotify_id)

    recent_tracks = SpotifyRecentlyPlayed.objects.filter(user_id=spotify_id)
    print("RECENT TRACKS ARE : ", recent_tracks)

    tracks = []
    for track in recent_tracks:
        response = {
            "user_id": track.user_id,
            "song_title": track.song_title,
            "artist_name": track.artist_name,
            "track_id": track.track_id,
            "played_at": track.played_at
        }
        tracks.append(response)

    return Response({"Recently Played: ": tracks}, status=status.HTTP_202_ACCEPTED)



class SpotifyAPI(object):
    access_token = None
    access_token_expires = datetime.datetime.now()
    access_token_did_expire = None
    client_id = None
    client_secret = None
    token_url = "https://accounts.spotify.com/api/token"

    def __init__(self, client_id, client_secret, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.client_id = client_id
        self.client_secret = client_secret

    def get_client_credentials(self):
        """
        Returns a base64 encoded string

        """
        client_id = self.client_id
        client_secret = self.client_secret
        if client_id == None or client_secret == None:
            raise Exception("You must set client_id and client_secret")
        client_creds = f"{client_id}:{client_secret}"
        client_creds_b64 = base64.b64encode(client_creds.encode())
        return client_creds_b64.decode()

    def get_token_header(self):

        client_creds_b64 = self.get_client_credentials()
        return {
            "Authorization": f"Basic {client_creds_b64}"
        }

    def get_token_data(self):
        return {
            "grant_type": "client_credentials"
        }

    def perform_auth(self):
        token_url = self.token_url
        token_data = self.get_token_data()
        token_headers = self.get_token_header()
        r = requests.post(token_url, data=token_data, headers=token_headers)

        if r.status_code not in range(200, 299):
            raise Exception("Could not authenticate client")
            return False
        data = r.json()
        print(r.json())
        now = datetime.datetime.now()
        access_token = data['access_token']
        expires_in = data['expires_in']
        expires = now + datetime.timedelta(seconds=expires_in)
        self.access_token = access_token
        self.access_token_expires = expires
        self.access_token_did_expire = expires < now
        return True

    def get_access_token(self):
        token = self.access_token
        expires = self.access_token_expires
        now = datetime.datetime.now()
        print(expires)
        print(now)
        if expires > now:
            self.perform_auth()
            return self.get_access_token()
        elif token == None:
            self.perform_auth()
            return self.get_access_token()
        return token

    def get_resource_header(self):
        access_token = self.get_access_token()
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        print(access_token)
        return headers

    def get_resource(self, lookup_id, resource_type='albums', version='v1'):
        endpoint = f"https://api.spotify.com/{version}/{resource_type}/{lookup_id}"
        headers = self.get_resource_header()
        r = requests.get(endpoint, header=headers)
        if r.status_code not in range(200, 299):
            return {}
        return r.json()

    def get_album(self, _id):
        self.get_resource(_id)

    def get_artist(self, _id):
        self.get_resource(_id, resource_type='artists')

    def base_search(self, query_params):
        headers = self.get_resource_header()
        endpoint = "https://api.spotify.com/v1/search"
        lookup_url = f"{endpoint}"
        r = requests.get(lookup_url, headers=headers)
        if r.status_code not in range(200, 299):
            return {}
        return r.json()

    def search(self, query=None, operator=None, operator_query=None, search_type='artist'):
        if query == None:
            raise Exception("A query is required")
        if isinstance(query, dict):
            query = " ".join([f"{k}:{v}" for k, v in query.items()])
        if operator != None and operator_query != None:
            if operator.lower() == "or" or operator.lower() == "not":
                operator = operator.upper()
                if isinstance(operator_query, str):
                    query = f"{query} {operator} {operator_query}"
        query_params = urlencode({"q": query, "type": search_type.lower()})
        return self.base_search(query_params)


@api_view(['GET'])
def spotify_login(request):
    # Redirect URI can be guessed, hence build a random state
    state = ''.join(
        secrets.choice(string.ascii_uppercase + string.digits) for _ in range(16)
    )

    print("STATE BEFORE SENDING IT ", state)

    scope = 'user-read-private user-read-email user-follow-read user-library-read user-read-recently-played ' \
            'user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative ' \
            'playlist-modify-public '

    payload = {
        'response_type': 'code',
        'client_id': os.environ.get('SPOTIFY_CLIENT_ID'),
        'scope': scope,
        'redirect_uri': REDIRECT_URI
    }

    res = HttpResponseRedirect(f'{AUTH_URL}/?{urlencode(payload)}')

    webbrowser.open(res.url)
    print(res.url)
    return Response({'message': "Returned token"}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
def spotify_callback(request):
    # Keep these for now, we will check the states later
    state = request.GET.get('state')

    # Stored cookie is showing None, check on this later
    stored_cookie = request.COOKIES.get('spotify_cookie')
    print("STORED COOKIE ", stored_cookie)

    print("Cookies ", request.COOKIES)
    print("STATE: ", state)

    code = request.GET.get('code')
    print(request)
    print("CODE :", code)

    # Request tokens with code we obtained
    auth_options = {
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'grant_type': 'authorization_code',
    }

    # Post request in order to get callback URL
    # Might have to add headers into this?
    # EDGE CASE - call it often etc?
    res = requests.post(TOKEN_URL, auth=(CLIENT_ID, CLIENT_SECRET), data=auth_options)

    res_data = res.json()
    print("----Response Data is : ", res_data)

    access_token = res_data.get('access_token')

    print("----Access TOKEN ", access_token)

    if res_data.get('error') or res.status_code != 200:
        Response({"Failed to receive token: %s "},
                 res_data.get('error', 'No error information received.'))

    # Getting user's information
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer {token}".format(token=access_token)
    }

    r = requests.get(ME_URL, headers=headers)
    user_data = r.json()
    print("----User Data: ", user_data)

    if r.status_code != 200:
        Response({"Failed to get Profile info %s "},
                 user_data.get('error', 'No error message returned.'))

    print("User Data: ", user_data)

    # Update DB if any of the user info has changed
    user_ID = user_data['id']
    print("USER ID: ", user_ID)

    if not user_data['images'][0]['url']:
        user_data['images'][0]['url'] = ''

    try:
        print("INSIDE TRY METHOD")
        spotify_user_info = SpotifyUser.objects.get(id=user_data['id'])
        print("USER INFO: ", spotify_user_info)
        print("SAVING NEW ACCESS TOKEN ", access_token)
        spotify_user_info.access_token = access_token
        spotify_user_info.save()
        print("DB IS UPDATED")

    except SpotifyUser.DoesNotExist:
        print("INSIDE CREATE FUNC")
        spotify_user_model = SpotifyUser.objects.create(country=user_data['country'],
                                                        display_name=user_data['display_name'],
                                                        id=user_data['id'], href=user_data['href'],
                                                        followers=user_data['followers']['total'],
                                                        image=user_data['images'][0]['url'],
                                                        access_token=access_token)

        print("MODEL : ", spotify_user_model)

        redirect(FRONTEND_URI + '?access_token=' + access_token + '&id=' + user_ID)

    return redirect(FRONTEND_URI + '?access_token=' + access_token + '&id=' + user_ID)


@api_view(['POST', 'GET'])
def get_spotify_update_email(request):
    # UPDATE EMAIL IF THEY DONT HAVE
    email = request.data.get('email')
    id = request.data.get('id')

    print("REQUEST DATA", request.data)
    print("ID ", id)
    print("Email ", email)

    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    spotify_user_info = SpotifyUser.objects.get(id=id)
    if spotify_user_info is None:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    print("USER ID ", spotify_user_info)
    spotify_user_info.email = email
    spotify_user_info.save()
    print("updated email data")

    user_spotify_info = {
        'id': spotify_user_info.id,
        'country': spotify_user_info.country,
        'display_name': spotify_user_info.display_name,
        'email': spotify_user_info.email,
        'href': spotify_user_info.href,
        'followers': spotify_user_info.followers,
        'image': spotify_user_info.image
    }

    print("Updated: ", user_spotify_info)

    return Response({"user": user_spotify_info}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
def spotify_me(request):
    email = request.data.get('email')
    # auth_token = request.data.get('auth_token')
    print(email)
    # print(auth_token)
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    spotify_user_info = SpotifyUser.objects.get(email=email)
    if spotify_user_info.email != email:
        return Response({"err": "invalid email"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user_spotify_info = {
        'id': spotify_user_info.id,
        'country': spotify_user_info.country,
        'display_name': spotify_user_info.display_name,
        'email': spotify_user_info.email,
        'href': spotify_user_info.href,
        'followers': spotify_user_info.followers
    }

    print(user_spotify_info)

    return Response(user_spotify_info, status=status.HTTP_202_ACCEPTED)


# These following function not used atm - could be changed later
@api_view(['GET'])
def spotify_refresh():
    # Refreshes access token

    payload = {
        'grant_type': 'refresh_token',
        'refresh_token': session.get('tokens').get('refresh_token'),
    }
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    res = requests.post(
        TOKEN_URL, auth=(CLIENT_ID, CLIENT_SECRET), data=payload, headers=headers
    )
    res_data = res.json()

    # Loading new token into session
    session['tokens']['access_token'] = res_data.get('access_token')
    return json.dumps(session['tokens'])
