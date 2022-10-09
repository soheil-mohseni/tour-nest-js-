import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserInterceptor } from './interceptors/user.interceptor';

@Module({
  imports: [PrismaModule], 
  controllers: [AuthController],
  providers: [AuthService , {
    provide: APP_INTERCEPTOR ,
    useClass: UserInterceptor
  }]
})
export class UserModule {}
