from django.conf.urls import url 
from authenticate import views 
 
urlpatterns = [ 
    url(r'^authenticate/', views.to_authenticate)
]
