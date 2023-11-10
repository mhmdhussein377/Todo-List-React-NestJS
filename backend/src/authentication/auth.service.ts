import {Injectable, NotFoundException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {PrismaService} from "src/prisma.service";
import {UserService} from "src/user/users.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt"
import { RegisterUserDto } from "./dto/register-user.dto";
import { User } from "src/user/user.model";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService : PrismaService, 
        private jwtService : JwtService, 
        private readonly userService : UserService) {}

    async login(loginDto: LoginDto) : Promise<any> {
        const {email, password} = loginDto

        const user = await this.prismaService.user.findUnique({
            where: {email}
        })

        if(!user) {
            throw new NotFoundException("User not found")
        }

        const validatePassword = await bcrypt.compare(password, user.password)

        if(!validatePassword) {
            throw new NotFoundException("Invalid password")
        }

        return {
            token: this.jwtService.sign({id: user.id})
        }
    }

    async register (createDto: RegisterUserDto) : Promise<any> {

        const createdUser = new User()
        createdUser.name = createdUser.name
        createdUser.email = createdUser.email
        createdUser.password = await bcrypt.hash(createDto.password, 10)

        const user = await this.userService.createUser(createdUser)

        return {
            token: this.jwtService.sign({id: user.id})
        }
    }
}