from django.conf.urls import url 
from spotify import views 
 
urlpatterns = [ 
    url(r'^spotify/', views.spotify_auth)
]
