import { Module } from '@nestjs/common';
import { PrismaController } from './prisma.controller';
import { PrismaService } from './prisma.service';

@Module({
  exports: [PrismaService],
  controllers: [PrismaController],
  providers: [PrismaService]
})
export class PrismaModule {}
