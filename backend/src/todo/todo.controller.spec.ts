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
});
