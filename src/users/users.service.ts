import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import {User} from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
  ) {}

  createNewUser(createUserDto: CreateUserDto) {
    return this.usersRepository.insert(createUserDto);
  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUserById(id: number): Promise<User>  {
    return this.usersRepository.findOne(id);
  }

  addServiceForUser() {
    // хз что тут должно быть...
  }

  async removeUserById(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
