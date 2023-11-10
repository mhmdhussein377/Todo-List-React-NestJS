import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
