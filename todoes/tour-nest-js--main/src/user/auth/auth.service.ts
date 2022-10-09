import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UserType } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

//   #########  SIGN UP ###########

interface SignupParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface NewExpenseParams {
  title: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaservice: PrismaService) {}

  async signup({ email, phone, name, password }: SignupParams , res:any) {
    const userExist = await this.prismaservice.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaservice.user.create({
      data: {
        email,
        phone,
        name,
        password: hashedPassword,
        user_type: UserType.BUYER,
      },
    });

    const token = await this.genrateJWT(user.name, user.id);
    res.cookie('session', token);
    res.send()
    return token;
  }

  //   #########  SIGN IN ###########

  async signin({ email, password }, res: any) {
    const user = await this.prismaservice.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException('there is no such user with this  Email', 400);
    }

    const hashedpassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedpassword);
    if (!isValidPassword) {
      throw new HttpException('invalid password', 400);
    }

    const token = await this.genrateJWT(user.name, user.id);
    res.set('Authorization', 'Bearer ' + token);
    res.send({
        success: true,
        token,
    })
    return jwt.decode(token);
  }

  //   #########  GENRATE TOKEN ###########



  private genrateJWT(name: string, id: number) {
    return jwt.sign(
      {
        name,
        id,
      },
      process.env.JSON_TOKEN_KEY,
      {
        expiresIn: 3600,
      },
    );
  }



  // ######################  creat new expense ###############

  async createnewexpense({ title }: NewExpenseParams , userId: number,) {
    const user = await this.prismaservice.home.create({
      data: {
        title,
        realtor_id: userId,
      },
    });
  }



  // ######################  DELETE expense ###############

  async deleteexpense(userId: number, expense_id: number) {
    const user = await this.prismaservice.home.delete({
      where: {
        id: expense_id,
      },
    }) 

    if (user){ return "deleted successfuly"}
  }


  // ######################  GET expense #################


  async getexpense(userId: number,) {
    const user = await this.prismaservice.home.findMany({
      where: {
        realtor_id: userId,
      },
    }) 

    if (user){ return user}
  }
 }
 