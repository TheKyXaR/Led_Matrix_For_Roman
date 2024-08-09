from django.shortcuts import render, get_object_or_404
from django.views import generic
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils import timezone

from django.contrib.auth.models import User
from .models import Config

class IndexView(generic.ListView):
	template_name = "main/index.html"

	def get_queryset(self) :
		pass

def save_config(request, user_pk) :
	user = get_object_or_404(User, pk=user_pk)

	Config.objects.create(name=request.POST["name"],
						  date=timezone.now(),
						  configuration=request.POST['configuration'],
						  author=user)

	return HttpResponseRedirect(reverse('main:index'))