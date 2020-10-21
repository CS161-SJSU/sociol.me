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


# class HelloView(APIView):
    # permission_classes = (IsAuthenticated,)             # <-- And here
    # def get(self, request):
    #     content = {'message': 'Hello, World!'}
    #     return Response(content)
# @api_view(['GET'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
# def example_view(request, format=None):
#     content = {
#         'user': unicode(request.user),  # `django.contrib.auth.User` instance.
#         'auth': unicode(request.auth),  # None
#     }
#     return Response(content)

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
    
