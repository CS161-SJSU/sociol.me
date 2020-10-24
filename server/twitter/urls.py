from django.conf.urls import url 
from backend import views 
 
urlpatterns = [ 
    url(r'^twitter/token/', views.twitter_get_token)
]
