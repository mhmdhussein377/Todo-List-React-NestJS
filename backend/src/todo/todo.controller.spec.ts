import {Test, TestingModule} from '@nestjs/testing';
import { TodoController } from './todo.contoller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Priority } from '@prisma/client';

describe('UsersController', () => {
    let controller : TodoController;
    let service: TodoService;

    beforeEach(async() => {
        const module : TestingModule = await Test.createTestingModule({controllers: [TodoController], providers: [TodoService]}).compile();

        controller = module.get < TodoController > (TodoController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createTodo', () => {
        it('should create a new todo', async () => {
            const userId = 1;
            const createTodoDto: CreateTodoDto = {
                description: 'hi',
                completed: false,
                date: new Date('2023-11-12T18:37:20.431Z'),
                priority: Priority.LOW,
            };
            const mockTodoResult = {
                id: 41,
                description: 'hi',
                priority: Priority.LOW,
                completed: false,
                date: new Date('2023-11-12T18:37:20.431Z'),
                createdAt: new Date('2023-11-12T18:37:27.089Z'),
                userId: 1,
            };
            jest.spyOn(service, 'createTodo').mockResolvedValue(mockTodoResult);
    
            const result = await controller.createTodo({ user: { id: userId } }, createTodoDto);
    
            expect(result).toBeDefined();
    
            expect(result).toEqual(mockTodoResult);
    
            expect(service.createTodo).toHaveBeenCalledWith(userId, createTodoDto);
        });
    });

    describe('deleteTodo', () => {
        it('should delete a todo', async () => {
            const userId = 1;
            const todoId = 41;
            const mockDeleteResult = { status: 200, message: 'Item deleted successfully' };

            jest.spyOn(service, 'deleteTodo').mockResolvedValue(mockDeleteResult);

            const result = await controller.deleteTodo({ user: { id: userId } }, todoId.toString());

            expect(result).toBeDefined();
            expect(result).toEqual(mockDeleteResult);
            expect(service.deleteTodo).toHaveBeenCalledWith(userId, todoId);
        });

        it('should handle unauthorized deletion', async () => {
            const userId = 1;
            const unauthorizedTodoId = 42;
            const mockUnauthorizedResult = { status: 401, message: 'You are not authorized to delete this todo' };

            jest.spyOn(service, 'deleteTodo').mockResolvedValue(mockUnauthorizedResult);

            const result = await controller.deleteTodo({ user: { id: userId } }, unauthorizedTodoId.toString());

            expect(result).toBeDefined();
            expect(result).toEqual(mockUnauthorizedResult);
            expect(service.deleteTodo).toHaveBeenCalledWith(userId, unauthorizedTodoId);
        });

        it('should handle todo not found during deletion', async () => {
            const userId = 1;
            const nonExistentTodoId = 43;
            const mockNotFoundResult = { status: 404, message: 'Todo not found' };

            jest.spyOn(service, 'deleteTodo').mockResolvedValue(mockNotFoundResult);

            const result = await controller.deleteTodo({ user: { id: userId } }, nonExistentTodoId.toString());

            expect(result).toBeDefined();
            expect(result).toEqual(mockNotFoundResult);
            expect(service.deleteTodo).toHaveBeenCalledWith(userId, nonExistentTodoId);
        });

    });

});
