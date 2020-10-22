from rest_framework import serializers 
from backend.models import GoogleSignIn
 
 
class GoogleSignInSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = GoogleSignIn
        fields = ('email',
                  'firstName',
                  'lastName',
                  'fullName',
                  'imageUrl',
                  'googleId',
                  'tokenId')
