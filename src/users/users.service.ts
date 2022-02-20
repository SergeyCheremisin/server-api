import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, getRepository} from 'typeorm';
import {User} from "./entities/user.entity";
import {Service} from "../services/entities/service.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
    ) {
    }

    async createNewUser(createUserDto: CreateUserDto) {
        return getRepository(User)
            .createQueryBuilder("user")
            .insert()
            .into(User)
            .values(createUserDto)
            .execute();
    }

    async getAllUsers(): Promise<User[]> {
        return getRepository(User)
            .createQueryBuilder("user")
            .getMany();
    }

    async getUserById(id: number): Promise<User> {
        return getRepository(User)
            .createQueryBuilder('user')
            .where("user.id = :id", {id})
            .getOne();
    }

    async addServiceForUser(user_id: number, service_id: number) {
        await getRepository(User)
            .createQueryBuilder("user")
            .relation(User, "services")
            .of(user_id)
            .add(service_id);
    }

    async getServiceForUserById(id: number) {
        return getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.services", "service")
            .where("user.id = :id", {id})
            .getOne();
    }

    async removeUserById(id: number): Promise<void> {
        await getRepository(User)
            .createQueryBuilder("user")
            .delete()
            .from(User)
            .where("id = :id", {id})
            .execute();
    }
}
