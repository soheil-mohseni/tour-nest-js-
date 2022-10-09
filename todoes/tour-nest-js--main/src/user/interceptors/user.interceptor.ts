import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {Request} from "express"; 
import { ExtractJwt } from 'passport-jwt';


export class UserInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, handler: CallHandler ,) {
    const request = context.switchToHttp().getRequest();
    // const token = request?.headers?.authorization?.split('Bearer ')[1];
     //const user = await jwt.decode(token);

    const data = request?.headers?.cookie?.split('session=')[1];
    // const tk = data.split('session=')[1];
    const user = await jwt.decode(data);

    request.user = user;
    
    return handler.handle();
  }
}
