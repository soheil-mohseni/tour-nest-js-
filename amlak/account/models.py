from django.db import models
from django.contrib.auth.models import User , AbstractBaseUser ,PermissionsMixin
from .managers import UserManager
# Create your models here.




class User(AbstractBaseUser, PermissionsMixin):
	phone_number = models.CharField(max_length= 11,unique=True)
	is_active = models.BooleanField(default= True)
	is_admin =  models.BooleanField(default= True)
	USERNAME_FIELD ="phone_number"
	#REQUIRED_FIELDS = ['phone_number']
	objects = UserManager()
	def __str__(self):
		return self.phone_number
	@property
	def is_staff(self):
		return self.is_admin



class Agency(models.Model):
	agency_name = models.CharField(max_length= 200)
	agency_number = models.CharField(max_length= 200)
	agency_city = models.CharField(max_length= 200)
	agency_employee = models.PositiveIntegerField()
	def __str__(self):
		return f'{self.agency_name}'

class Adminstor(models.Model):
	name = models.CharField(max_length= 200)
	phone_number = models.CharField(max_length= 200)
	user = models.ForeignKey (User,on_delete=models.CASCADE)
	def __str__(self):
		return f'{self.name}'

class Adviser(models.Model):
	name = models.CharField(max_length= 200)
	adviser_city = models.CharField(max_length= 200)
	phone_number = models.CharField(max_length= 200)
	user = models.ForeignKey (User,on_delete=models.CASCADE)
	def __str__(self):
		return f'{self.name}'

class OtpCode(models.Model):
	phone_number = models.CharField(max_length=11,)
	code = models.PositiveSmallIntegerField()
	created = models.DateTimeField(auto_now=True)

	def __str__(self):
		return f'{self.phone_number} - {self.code} - {self.created}'