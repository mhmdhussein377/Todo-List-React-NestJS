import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { JwtAuthGuard } from "src/authentication/auth.guard";
import { Request, Response } from "express";

@Controller("user")
export class UserController {
    constructor(private readonly userService : UserService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Req() request: Request, @Res() response: Response):Promise<any>{
        try {
            const result = await this.userService.getAllUser();
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully fetch data!',
                result: result
            })
        } catch (error) {
            return response.status(500).json({
                status: 'Ok!',
                message : 'Internal Server Error!'
            })
        }
    }
}