import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/user/users.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/user.model';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(dto: LoginDto, req: Request, res: Response): Promise<any> {
    const {email, password} = dto

    const existedUser = await this.prismaService.user.findUnique({where: {email}})

    if(!existedUser) {
        throw new BadRequestException("Wrong credentials")
    }

    const isMatch = await this.validatePassword({password, hashedPassword: existedUser.password})

    if(!isMatch) {
        throw new BadRequestException("Wrong credentials")
    }

    const token = await this.signToken({id: existedUser.id, email: existedUser.email})
    
    if(!token) {
      throw new ForbiddenException()
    }

    res.cookie('token', token)

    return res.send({message: 'Logged in successfully', token})
  }

  async register(dto: RegisterUserDto): Promise<any> {
    const {name, email, password} = dto

    const existedUser = await this.prismaService.user.findUnique({where: {email}})

    if(existedUser) {
        throw new BadRequestException("Email already exists")
    }

    const hashedPassword = await this.hashPassword(password)

    await this.prismaService.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { status: 200, message: 'Signup was successfull' };
  }

  async signout(req: Request, res: Response): Promise<any> {
    res.clearCookie("token")
    return res.send({message: "Logged out successfully"})
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10
    return await bcrypt.hash(password, saltOrRounds)
  }

  async validatePassword(args: {password: string, hashedPassword: string}) {
    return await bcrypt.compare(args.password, args.hashedPassword)
  }

  async signToken(args: {id: number, email: string}) {
    const payload = args

    return this.jwtService.sign(payload, {secret: process.env.JWT_SECRET})
  }
}
