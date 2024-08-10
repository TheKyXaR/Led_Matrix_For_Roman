from django.shortcuts import render
from django.views import generic

from main.models import Config

# Create your views here.
class StoreView(generic.ListView) :
	model = Config
	template_name = 'store/index.html'
	context_object_name = 'configs'

	def get_queryset(self) :
		return Config.objects.all()