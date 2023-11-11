import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards
} from "@nestjs/common";
import {CreateTodoDto} from "./dto/create-todo.dto";
import {TodoService} from "./todo.service";
import {JwtAuthGuard} from "src/authentication/auth.guard";
import {Todo, User} from "@prisma/client";
import {UpdateTodoDto} from "./dto/update-todo.dto";

@Controller("todos")
export class TodoController {
    constructor(private readonly todoService : TodoService) {}

    @UseGuards(JwtAuthGuard)
    @Post("create")
    createTodo(@Req()req, @Body()dto : CreateTodoDto) {
        const userId = (req.user as User).id;
        return this.todoService.createTodo(userId, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    updateTodo(@Req()req, @Param('id')id : string, @Body()dto : UpdateTodoDto) {
        const userId = (req.user as User).id;
        return this.todoService.updateTodo(userId, parseInt(id, 10), dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id/delete")
    deleteTodo(@Req()req, @Param('id')id : string) {
        const userId = (req.user as User).id;
        return this.todoService.deleteTodo(userId, parseInt(id, 10));
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllTodosForUser(@Req() req): Promise<Todo[]> {
        const userId = (req.user as User).id;
        return this.todoService.getUserTodos(userId);
    }
}
