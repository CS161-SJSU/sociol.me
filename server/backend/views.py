# Create your views here.
from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from backend.models import SocialApp
from backend.serializers import SocialAppSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated  # <-- Here
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response

from google.oauth2 import id_token
from google.auth.transport import requests
import requests as httprequest


@api_view(['GET', 'POST', 'DELETE'])
def servers_list(request):
    if request.method == 'GET':
        servers = SocialApp.objects.all()
        
        title = request.GET.get('title', None)
        if title is not None:
            servers = SocialApp.filter(title__icontains=title)
        
        servers_serializer = SocialAppSerializer(servers, many=True)
        return JsonResponse(servers_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        server_data = JSONParser().parse(request)
        server_serializer = SocialAppSerializer(data=server_data)
        if server_serializer.is_valid():
            server_serializer.save()
            return JsonResponse(server_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(server_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = SocialApp.objects.all().delete()
        return JsonResponse({'message': '{} Tutorials were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def servers_detail(request, pk):
    try: 
        servers = SocialApp.objects.get(pk=pk) 
    except SocialApp.DoesNotExist: 
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        servers_serializer = SocialAppSerializer(servers) 
        return JsonResponse(servers_serializer.data) 

    elif request.method == 'PUT': 
        servers_data = JSONParser().parse(request) 
        servers_serializer = SocialAppSerializer(servers, data=servers_data) 
        if servers_serializer.is_valid(): 
            servers_serializer.save() 
            return JsonResponse(servers_serializer.data) 
        return JsonResponse(servers_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        servers.delete() 
        return JsonResponse({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
        
@api_view(['GET'])
def servers_list_published(request):
    servers = SocialApp.objects.filter(published=True)
        
    if request.method == 'GET': 
        servers_serializer = SocialAppSerializer(servers, many=True)
        return JsonResponse(servers_serializer.data, safe=False)

# SSO try out
# https://developers.google.com/identity/sign-in/web/backend-auth

@api_view(['POST','GET'])
def to_servers(request):
    servers = SocialApp.objects.filter(published=True)
    
    if request.method == 'POST': 
        print("if")
        # token = request.data.get('tokenId')
        token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3OGFiMWRjNTkxM2Q5MjlkMzdjMjNkY2FhOTYxODcyZjhkNzBiNjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDEzODg5MzE3OTYyLXU3cnJhNDI4Z2NtMmEzaW4xaWppNWppYWYxcjRzbnRjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDEzODg5MzE3OTYyLXU3cnJhNDI4Z2NtMmEzaW4xaWppNWppYWYxcjRzbnRjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzOTkwOTc3NDgwMzIzODA1MjgyIiwiZW1haWwiOiJsZWVraW1idWk5MkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Im5yT1ZuTnZzWmpDbTNkb296T2NQNnciLCJuYW1lIjoiTGVlIEtpbSIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLTVvMHVUNGp4RkpnL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y21PNWpxYkxVczVRRm5fTGw2T0NBc05YQ2ZHSXcvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkxlZSIsImZhbWlseV9uYW1lIjoiS2ltIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MDMyNjE1NDEsImV4cCI6MTYwMzI2NTE0MSwianRpIjoiZDg5MTNlZjc4MDAwODZjZDI5M2E4MTY5N2Q1MmE3YjFhYWUxYjMxMiJ9.W4aIYZ5X_OqFoEku4VmYzT3EiEWfYajPZVLV0gGRtxZAmisoCeOYF3uOPoWFSmEWnBaOFruN98utbMZxNW_gd-KJQDNOqPwciFsTm3XgEZ5fY1VNfTB1_r3jZHzEb4S6Hm-nulT_RWUrUme9WxcZkfFmgZM396d1gL-b0Xx1buFIoqJ8LPDb8dBzShtSiIv3woHw16bTL0wKYcd5dCpue6VeKaY0agTP_LEZT58vZQVQbaImnIWDz2TGmbbLkTCqu_5MmsJrU0LXq-1k4M9Uv8WkgGt_ADWRVw9aV6TLGCLfWkNsGcbbvmyqsts7HsD0loShiP-AhKJB1QU1gvV53g"

        try:
            print("try")
            CLIENT_ID = "413889317962-u7rra428gcm2a3in1iji5jiaf1r4sntc.apps.googleusercontent.com"

            idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            print(idinfo)

            # ID token is valid. Get the user's Google Account ID from the decoded token.
            userid = idinfo['sub']
    
            response = httprequest.get("https://oauth2.googleapis.com/tokeninfo?id_token=" + token)
            print(response.json())

            return Response({'message': 'Google idinfo OK!'}, status=status.HTTP_202_ACCEPTED)

        except ValueError:
            # Invalid token
            print("hehehe")
            return Response({'message': 'Google idinfo is wrong!'})
    

    print("hohoho")
    return Response({'message': 'Google try!'})
