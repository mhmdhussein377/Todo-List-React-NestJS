import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20, {message: "Password has to be at between 3 adn 20 chars"})
    public password: string;
}