from django.shortcuts import render , redirect
from .models import User , OtpCode
from django.contrib import auth
from django.views import View
import random
from utils import send_otp_code
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.mixins import LoginRequiredMixin
import datetime
from datetime import timedelta


# Create your views here.




def submit(request):
	if request.method == 'POST':
		
		if request.POST['password1'] == request.POST['password2']: 
			try: 

				user = User.objects.get(phone_number=request.POST['phone_number']) 


				return render(request, 'account/signup.html', {'error':'phone_number has already been taken!'})
			except User.DoesNotExist: 

				user = User.objects.create_user(request.POST['phone_number'],request.POST['password1'] )
				request.session['password'] = {
				'password': request.POST['password1'],
						}
				#auth.login(request,user)
				return redirect('account:user_login')
				
				
 
		else: # if password 1 and  password2 don't be same :
			alerts = 'samba' 
			contex = {'alert' : alerts }
			return render(request,'templates/account/signup.html', contex)
	else:
		return redirect('http://127.0.0.1:8000/accounts/login')



class UserRegisterView(View):
	template_name = 'account/login.html'

	def get(self, request):
		return render(request, self.template_name,)

	def post(self, request):
	#	form = self.form_class(request.POST)
	#	if form.is_valid():
		random_code = random.randint(1000, 9999)
		send_otp_code(request.POST['phone_number'], random_code)
		OtpCode.objects.create(phone_number=request.POST['phone_number'], code=random_code)
		phone = request.POST['phone_number']
		request.session['usercode_expire'] = {
				'phone_number': request.POST['phone_number'],
			}
		messages.success(request, 'we sent you a code', 'success')
		return redirect('account:verify_code')




class UserRegisterVerifyCodeView(View):
	current_time = datetime.datetime.now()
	n = 3
	future_time = current_time + timedelta(minutes = n)

	def get(self, request):
		#form = self.form_class
		print(datetime.datetime.now())
		return render(request, 'account/verify.html',)

	def post(self, request):
		user_session = request.session['usercode_expire']
		code_instance = OtpCode.objects.get(phone_number = user_session['phone_number'])
		code = str(code_instance.code)
		password_session = request.session['password']
		if request.POST['verify_code'] == code:
			if self.future_time > datetime.datetime.now():
				code_instance.delete()
				user = authenticate(phone_number= user_session['phone_number'], password= password_session["password"])
				auth.login(request,user)
				messages.success(request, 'you have loged in.', 'success')
				return redirect('account:home')
			else:
				messages.error(request, 'this code is wrong', 'danger')
				return redirect('account:verify_code')
		#return redirect('home:home)




def home(request):
	return render(request, 'account/index.html',)


# signup
def signup(request):
	return render(request, 'account/signup.html')