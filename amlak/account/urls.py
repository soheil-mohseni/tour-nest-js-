from django.contrib import admin
from django.urls import path
from.import views


app_name = "account"
urlpatterns = [
    path('admin/', admin.site.urls),
	path('signup', views.signup ,name = "signup"),
	path('signup/submit', views.submit ,name = "submit"),
    path('login', views.UserRegisterView.as_view(), name='user_login'),
	path('login/verify', views.UserRegisterVerifyCodeView.as_view(), name='verify_code'),
	path('home', views.home ,name = "home"),      
]
