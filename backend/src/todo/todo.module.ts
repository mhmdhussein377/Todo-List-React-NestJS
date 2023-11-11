import {Module} from '@nestjs/common';
import {PrismaService} from 'prisma/prisma.service';
import {TodoController} from './todo.contoller';
import {TodoService} from './todo.service';
import { JwtStrategy } from 'src/authentication/jwt.strategy';

@Module({
    controllers: [TodoController],
    providers: [TodoService, PrismaService, JwtStrategy]
})
export class TodoModule {}