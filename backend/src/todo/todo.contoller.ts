import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoService } from "./todo.service";
import { JwtAuthGuard } from "src/authentication/auth.guard";

@Controller("todos")
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtAuthGuard)
    @Post("create")
    createTodo(@Req() req, @Body() dto: CreateTodoDto) {
        const userId = (req.user as any).id;
        return this.todoService.createTodo(userId, dto);
    }
}
