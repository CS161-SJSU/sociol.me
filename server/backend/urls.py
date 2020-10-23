from django.conf.urls import url 
from backend import views 
 
urlpatterns = [ 
    # url(r'^$', views.servers_list),
    # url(r'^(?P<pk>[0-9]+)$', views.servers_detail),
    # url(r'^published$', views.servers_list_published),
<<<<<<< HEAD
    url(r'^googleToken$', views.to_servers)
=======
    url(r'^server$', views.to_servers)
>>>>>>> 1c62574d8e11e1758e5616ff0c270b7f2b7a4e3d
]
