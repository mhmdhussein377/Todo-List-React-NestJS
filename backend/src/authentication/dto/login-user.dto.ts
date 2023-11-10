import { IsString, Length } from "class-validator";

export class LoginDto {
    @IsString()
    @Length(6, 45)
    email: string;

    @Length(6, 100)
    @IsString()
    password: string;
}