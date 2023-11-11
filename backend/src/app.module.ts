import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthMiddleware } from './authentication/auth.middleware';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
