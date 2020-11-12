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
from dotenv import load_dotenv

load_dotenv()
from django.shortcuts import render
from urllib.parse import urlencode
import base64
import datetime

from spotify.models import SpotifyUser



# Client info
CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
REDIRECT_URI = os.getenv('SPOTIFY_REDIRECT_URI')

# Spotify API endpoints
AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
ME_URL = 'https://api.spotify.com/v1/me'

FRONTEND_URI = 'http://localhost:3000/'


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
def spotify_auth(request):
    #spotify = SpotifyAPI(client_id, client_secret)
    #spotify.perform_auth()
   # print(spotify.access_token)
    # # spotify.get_access_token()
    # spotify.get_resource_header()
    return Response({'message': 'yay'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def spotify_login(request):
    payload = {
        'response_type': 'code',
        'client_id': os.environ.get('SPOTIFY_CLIENT_ID'),
        'scope': 'user-read-private user-read-email user-follow-read',
        'redirect_uri': REDIRECT_URI
    }

    # res = HttpResponseRedirect(f'{AUTH_URL}/?{urlencode(payload)}')

    res = redirect(f'{AUTH_URL}/?{urlencode(payload)}')
    webbrowser.open(res.url)
    print(res.url)
    return Response({'message': "Returned token"}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
def spotify_callback(request):
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

    spotify_user_model = SpotifyModel.objects.create(country=user_data['country'],
                                                     display_name=user_data['display_name'], email=user_data['email'],
                                                     id=user_data['id'], href=user_data['href'],
                                                     followers=user_data['followers']['total'])

    return redirect(FRONTEND_URI + '?access_token=' + access_token)

    #  return redirect(url_for('me'))


# These following functions could be changed later
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
    afafa
    return json.dumps(session['tokens'])


@api_view(['GET'])
def spotify_me(request):
    email = request.data.get('email')
    #auth_token = request.data.get('auth_token')
    print(email)
    #print(auth_token)
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    spotify_user_info = SpotifyUser.objects.get(email = email)
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
