import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from 'prisma/prisma.service';
import {CreateTodoDto} from './dto/create-todo.dto';
import {Todo} from '@prisma/client';
import {UpdateTodoDto} from './dto/update-todo.dto';

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

    async updateTodo(userId : number, todoId : number, updateTodoDto : UpdateTodoDto) : Promise < {
        status: number;
        message: string
    } | Todo > {
        try {
            const todo = await this
                .prismaService
                .todo
                .findUnique({
                    where: {
                        id: todoId
                    }
                });

            if (!todo) {
                return {status: 404, message: 'Todo not found'};
            }

            if (todo.userId !== userId) {
                return {status: 401, message: 'You are not authorized to update this todo'};
            }

            const updatedTodo = await this
                .prismaService
                .todo
                .update({
                    where: {
                        id: todoId
                    },
                    data: updateTodoDto
                });

            return updatedTodo;
        } catch (error) {
            return {status: 500, message: 'Internal server error'};
        }
    }

    async deleteTodo(userId : number, todoId : number) : Promise < {
        status: number,
        message: string
    } > {
        try {
            const todo = await this
                .prismaService
                .todo
                .findUnique({
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

            await this
                .prismaService
                .todo
                .delete({
                    where: {
                        id: todoId
                    }
                });

            return {status: 200, message: "Item deleted successfully"}
        } catch (error) {
            return {status: 500, message: "Internal server error"}
        }
    }

    async getUserTodos(userId : number) : Promise < Todo[] > {
        const user = await this.prismaService.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    todos: true
                }
            });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user.todos;
    }
}
