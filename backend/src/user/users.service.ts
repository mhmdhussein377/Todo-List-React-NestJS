import { PrismaService } from 'prisma/prisma.service';
import { User } from './user.model';
import { ConflictException } from '@nestjs/common';

export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: User): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new ConflictException('Username already exists');
    }

    return this.prisma.user.create({
      data,
    });
  }
}
