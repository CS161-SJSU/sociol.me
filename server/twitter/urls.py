from django.conf.urls import url 
from twitter import views 
 
urlpatterns = [ 
    url(r'^twitter/token/', views.twitter_authenticate)
]
