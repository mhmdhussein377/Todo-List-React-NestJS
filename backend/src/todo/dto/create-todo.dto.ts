import {Priority} from '@prisma/client';
import {IsNotEmpty, IsBoolean, IsString, IsEnum} from 'class-validator';

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    description : string;

    @IsNotEmpty()
    @IsBoolean()
    completed : boolean;

    @IsNotEmpty()
    @IsEnum(Priority)
    priority : Priority;
}
