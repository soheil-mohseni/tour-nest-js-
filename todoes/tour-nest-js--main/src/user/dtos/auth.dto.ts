import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MinLength,
  MATCHES,
} from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}



// ###################   create new expense ################


export class CreateExpenseDto {
  @IsString()
  title: string;

}
