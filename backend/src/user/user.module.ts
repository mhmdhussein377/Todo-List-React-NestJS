import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './users.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
