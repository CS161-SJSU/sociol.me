from django.conf.urls import url 
from backend import views 
 
urlpatterns = [ 
    url(r'^api/servers$', views.servers_list),
    url(r'^api/servers/(?P<pk>[0-9]+)$', views.servers_detail),
    url(r'^api/servers/published$', views.servers_list_published)
]
