from django.conf.urls import url 
from twitter import views 
 
urlpatterns = [ 
    url(r'^twitter/auth/', views.twitter_authenticate),
    url(r'^twitter/verify/$', views.verify),
    url(r'^twitter/info/', views.get_twitter_info),
]
