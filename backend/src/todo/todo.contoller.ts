import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoService } from "./todo.service";
import { JwtAuthGuard } from "src/authentication/auth.guard";
import { Todo, User } from "@prisma/client";

@Controller("todos")
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtAuthGuard)
    @Post("create")
    createTodo(@Req() req, @Body() dto: CreateTodoDto) {
        const userId = (req.user as User).id;
        return this.todoService.createTodo(userId, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id/delete")
    deleteTodo(@Req() req, @Param('id') id: string) {
        const userId = (req.user as User).id;
        return this.todoService.deleteTodo(userId, parseInt(id, 10));
    }
}
