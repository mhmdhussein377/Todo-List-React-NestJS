import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/users.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, UserService, AuthMiddleware, PassportModule],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
})
export class AuthModule {}
