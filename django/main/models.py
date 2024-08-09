import datetime

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Config(models.Model):
	name = models.CharField(max_length=200)
	date = models.DateTimeField("date created")
	configuration = models.TextField()
	author = models.ForeignKey(User, on_delete=models.CASCADE)

	def __str__(self) :
		return self.name