import {Priority} from '@prisma/client';
import {IsNotEmpty, IsBoolean, IsString, IsEnum, IsDate} from 'class-validator';

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    description : string;

    @IsNotEmpty()
    @IsBoolean()
    completed : boolean;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    @IsEnum(Priority)
    priority : Priority;
}
