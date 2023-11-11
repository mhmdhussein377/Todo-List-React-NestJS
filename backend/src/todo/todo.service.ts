import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from 'prisma/prisma.service';
import {CreateTodoDto} from './dto/create-todo.dto';
import {Todo} from '@prisma/client';

@Injectable()
export class TodoService {
    constructor(private readonly prismaService : PrismaService) {}

    async createTodo(userId : number, createTodoDto : CreateTodoDto) : Promise < Todo > {
        const todo = await this.prismaService.todo.create({
                data: {
                    ...createTodoDto,
                    userId
                }
            });

        return todo;
    }

    async deleteTodo(userId : number, todoId : number) : Promise<{status: number, message: string}> {
        try {
            const todo = await this.prismaService.todo.findUnique({
                    where: {
                        id: todoId
                    }
                });

            if (!todo) {
                return {status: 404, message: "Todo not found"}
            }

            if (todo.userId !== userId) {
                return {status: 401, message: "You are not authorized to delete this todo"}
            }

            await this.prismaService.todo.delete({
                    where: {
                        id: todoId
                    }
                });

            return {status: 200, message: "Item deleted successfully"}
        } catch (error) {
            return {
                status: 500,
                message: "Internal server error"
            }
        }
    }
}
