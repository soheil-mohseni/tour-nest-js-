from django.contrib import admin
from .models import User , OtpCode
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserAdmin(BaseUserAdmin):
	#form = UserChangeForm
	#add_form = UserCreationForm

	list_display = ('phone_number', 'is_admin',)
	list_filter = ('is_admin',)
	readonly_fields = ('last_login',)

	fieldsets = (
		('Main', {'fields':('phone_number','password' )}),
		('Permissions', {'fields':('is_active', 'is_admin', 'is_superuser', 'last_login', 'groups', 'user_permissions')}),
	)

	add_fieldsets = (
		(None, {'fields':('phone_number',)}),
	)
	search_fields = (['phone_number'])
	ordering = ('phone_number',)
	filter_horizontal = ('groups', 'user_permissions')
	
admin.site.register(User, UserAdmin)
admin.site.register(OtpCode)
