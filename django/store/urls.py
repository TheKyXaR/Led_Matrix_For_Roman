from django.urls import path
from . import views

app_name = "store"
urlpatterns = [
	path("", views.StoreView.as_view(), name='index'),
]