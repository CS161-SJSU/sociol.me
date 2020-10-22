from django.conf.urls import url 
from backend import views 
 
urlpatterns = [ 
    # url(r'^$', views.servers_list),
    # url(r'^(?P<pk>[0-9]+)$', views.servers_detail),
    # url(r'^published$', views.servers_list_published),
    url(r'^server$', views.to_servers)
]
