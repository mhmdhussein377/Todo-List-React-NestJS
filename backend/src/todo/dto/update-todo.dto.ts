import { Priority } from '@prisma/client';
import {IsString, IsEnum, IsBoolean, IsISO8601, IsOptional} from 'class-validator';

export class UpdateTodoDto {
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(Priority)
    priority?: Priority;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsISO8601()
    date?: Date;
}
