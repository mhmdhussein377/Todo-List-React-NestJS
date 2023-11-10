import { IsString, Length } from "class-validator";

export class RegisterUserDto {

    @IsString()
    @Length(5, 100)
    name: string;

    @IsString()
    @Length(5, 45)
    email: string;

    @IsString()
    @Length(6, 100)
    password: string;
}