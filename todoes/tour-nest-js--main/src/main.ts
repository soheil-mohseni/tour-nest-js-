import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true ,
      transform : true ,
      transformOptions: {
        enableImplicitConversion: true , 
      } 
    })
  )

  app.enableCors({ origin: 'http://localhost:3006' , credentials:true})

  await app.listen(3000);
}
bootstrap();
