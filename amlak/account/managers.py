from django.contrib.auth.models import BaseUserManager
from .models import User

class UserManager(BaseUserManager):
	User = User()
	def create_user(self, phone_number,password):
		if not phone_number:
			raise ValueError('user must have phone number')
		User = self.model(phone_number=phone_number,)
		User.set_password(password)
		User.save(using=self._db)
		return User

	def create_superuser(self, phone_number,password):
		user = self.create_user(phone_number,password)
		user.is_admin = True
		user.is_superuser = True
		user.save(using=self._db)
		return user
