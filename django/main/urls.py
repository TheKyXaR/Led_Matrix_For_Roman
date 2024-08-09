from django.urls import path
from . import views

app_name = "main"
urlpatterns = [
	path("", views.IndexView.as_view(), name='index'),
	path("save_config/<int:user_pk>", views.save_config, name="save_config"),
	path("config/<int:config_pk>", views.config_load, name="config")
]