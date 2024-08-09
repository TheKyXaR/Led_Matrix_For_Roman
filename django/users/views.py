from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.views import generic
from django.db.utils import IntegrityError

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from main.models import Config

def registration(request) :  # registation
	if request.POST :
		try:
			user = User.objects.create_user(username = request.POST['username'],
											password = request.POST['password'])
			user.save()
			return HttpResponseRedirect(reverse("users:log"))	
		except IntegrityError:
			return render(request,
					      "registration/reg.html",
					      {
					      	"error_message": "Username is taken"
					      })
		
	else :
		return render(request, "registration/reg.html")

def login_def(request) :  # login
	if request.POST :
		user = authenticate(request,
							username = request.POST['username'],
							password = request.POST['password'])
		if user is not None :
			login(request, user)
			return HttpResponseRedirect(reverse("main:index"))
		else :
			return render(request,
					      "registration/login.html",
					      {
					      	"error_message": "Invalid left login or password"
					      })
	else :
		return render(request, "registration/login.html")

def logout_def(request) :  # logout
	logout(request)
	return HttpResponseRedirect(reverse("main:index"))

def profile(request, user_pk) :  # Profile
	user = get_object_or_404(User, pk = user_pk)
	configs = Config.objects.filter(author = user_pk)

	return render(request,
				  "registration/profile.html",
				  {
				  	"user": user if user else False,
				  	"configs": configs
				  })

def change_password(request, user_pk) :
	user = User.objects.get(pk = user_pk)

	if request.user.id == user.id :
		user.set_password(request.POST["password"])
		user.save()
		return HttpResponseRedirect(reverse("users:log"))
	else :
		return HttpResponse("fuck you") # change text error

def change_email(request, user_pk) :
	user = User.objects.get(pk = user_pk)

	if request.user.id == user.id:
		user.email = request.POST["email"]
		user.save()
		return HttpResponseRedirect(reverse("users:profile", args = (user_pk,)))
	else :
		return HttpResponse("fuck you") # change text error