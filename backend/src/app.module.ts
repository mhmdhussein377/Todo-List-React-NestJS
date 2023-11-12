import {Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [AuthModule, PrismaModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
