from django.contrib.auth.mixins import UserPassesTestMixin
from kavenegar import *


def send_otp_code(phone_number, code):
	try:
		api = KavenegarAPI('484A66554174306864316D5478614F422B637648655538316178546A4E4C45303358726665764E4C7831303D')
		print(phone_number)
		params = {
			'sender': '10008663',
			'receptor': phone_number,
			'message': "اسماعیل محسنی محل رفت و آمد  درآوردم  فردا میام دم مغازت توی هاشم آباد چاقو چاقو ات میکنم",
		}
		response = api.sms_send( params)
		print(response)
	except APIException as e:
		print(e)
	except HTTPException as e:
		print(e)


class IsAdminUserMixin(UserPassesTestMixin):
	def test_func(self):
		return self.request.user.is_authenticated and self.request.user.is_admin

		#	'message': f'{code} کد تایید شما ',
