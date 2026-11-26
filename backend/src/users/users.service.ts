import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto.js';
import { User } from './user.entity.js';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

  create(dto: CreateUserDto) {
    const user = this.users.create({
      email: dto.email,
      name: dto.name,
      role: dto.role ?? 'athlete',
      passwordHash: dto.password,
    });
    return this.users.save(user);
  }

  findAll() {
    return this.users.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const user = await this.users.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
