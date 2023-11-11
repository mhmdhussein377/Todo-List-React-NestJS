import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { Request, Response } from "express"
import { RegisterUserDto } from "./dto/register-user.dto";

@Controller("auth")
export class AuthController {
    constructor(private  readonly authService: AuthService){}

    @Post("login")
    login(@Body() dto: LoginDto, @Req() req, @Res() res) {
        return this.authService.login(dto, req, res)
    }

    @Post("register")
    register(@Body() dto: RegisterUserDto) {
        return this.authService.register(dto)
    }

    @Get("signout")
    signout(@Req() req, @Res() res) {
        return this.authService.signout(req, res)
    }
}