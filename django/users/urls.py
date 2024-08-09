from django.urls import path
from . import views

app_name = "users"
urlpatterns = [
	# path("/registration", views.RegView.as_view(), name='reg'),
	path("registration/", views.registration, name="reg"),
	path("login/", views.login_def, name="log"),
	path("logout/", views.logout_def, name="logout"),
	path("profile/<int:user_pk>", views.profile, name="profile"),
	path("change_password/<int:user_pk>", views.change_password, name="change_password"),
	path("change_email/<int:user_pk>", views.change_email, name="change_email"),
]