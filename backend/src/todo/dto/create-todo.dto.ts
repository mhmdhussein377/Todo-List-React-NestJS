import { Priority } from '@prisma/client';
import {IsNotEmpty, IsBoolean, IsString, IsEnum, IsISO8601} from 'class-validator';

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    description : string;

    @IsNotEmpty()
    @IsBoolean()
    completed : boolean;

    @IsNotEmpty()
    @IsISO8601()
    date: Date;

    @IsNotEmpty()
    @IsEnum(Priority, {each: true})
    priority : Priority;
}
