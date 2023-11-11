import {Injectable} from '@nestjs/common';
import {PrismaService} from 'prisma/prisma.service';
import {CreateTodoDto} from './dto/create-todo.dto';

@Injectable()
export class TodoService {
    constructor(private readonly prismaService : PrismaService) {}

    async createTodo(userId : number, createTodoDto : CreateTodoDto) : Promise < any > {
        const todo = await this.prismaService.todo.create({
                data: {
                    ...createTodoDto,
                    userId,
                }
            });

        return todo;
    }
}
