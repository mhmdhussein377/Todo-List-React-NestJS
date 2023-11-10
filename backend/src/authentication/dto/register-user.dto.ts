import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterUserDto {

    @IsNotEmpty()
    @IsString()
    @Length(5, 100)
    public name: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20, {message: "Password has to be at between 6 and 20 chars"})
    public password: string;
}