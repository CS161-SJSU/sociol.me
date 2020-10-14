from rest_framework import serializers 
from backend.models import SocialApp
 
 
class SocialAppSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = SocialApp
        fields = ('id',
                  'title',
                  'description',
                  'published')
