import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository, getConnection } from 'typeorm';
import {User} from "./entities/user.entity";
import {Service} from "../services/entities/service.entity";

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      @InjectRepository(Service)
      private servicesRepository: Repository<Service>,
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

  async addServiceForUser(user_id: number, service_id: number) {
    const user = await this.getUserById(user_id);
    const service = await this.servicesRepository.findOne(service_id);
    user.services = [service];
    const connection = getConnection();
    await connection.manager.save([user]);
  }

  async getServiceForUserById(id) {
    const connection = getConnection();
    const subscribers = await connection
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.services", "service")
        .getMany();
    const user = subscribers.find(subscriber => subscriber.id == id);
    return user.services;
  }

  async removeUserById(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
