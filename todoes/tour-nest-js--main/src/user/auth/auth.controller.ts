import { applyDecorators, Body, Controller, Delete, Get, Param, ParseIntPipe, Post , Res } from '@nestjs/common';
import { SignupDto, SigninDto, CreateExpenseDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';
import { User } from '../decorators/user.decorators'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: SignupDto , @Res() res) {
    return this.authService.signup(body , res);
  }

  @Post('/signin')
  signin(@Body() body: SigninDto , @Res() res: any) {
    return this.authService.signin(body , res);
  }
// ##################################################################################



  @Post('/createxpense')
  creatnewexpense(@Body() body: CreateExpenseDto, @User()  user) {
    console.log(user.id)
    //return "hello"
    return this.authService.createnewexpense(body,user.id);
  }


  @Delete('/deleteexpense/:ids')
  deleteexpense(@User()  user , @Param('ids') expense_id: number ,) {
    console.log(user.id)
    //return "hello"
    return this.authService.deleteexpense(user.id , expense_id);
  }


  @Get('/getexpense')
  getexpense(@User()  user) {
    console.log(user.id)
    //return "hello"
    return this.authService.getexpense(user.id);
  }
}
