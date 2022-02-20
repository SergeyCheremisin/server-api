import {Injectable} from '@nestjs/common';
import {CreateServiceDto} from './dto/create-service.dto';
import {UpdateServiceDto} from './dto/update-service.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {getRepository, Repository} from "typeorm";
import {Service} from "./entities/service.entity";

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
    ) {
    }

    async createNewService(createServiceDto: CreateServiceDto) {
        return getRepository(Service)
            .createQueryBuilder("service")
            .insert()
            .into(Service)
            .values(createServiceDto)
            .execute();
    }

    async findAllServices(): Promise<Service[]> {
        return getRepository(Service)
            .createQueryBuilder("service")
            .getMany();
    }

    async findPopularServices(): Promise<Service[]> {
        const services = await getRepository(Service)
            .createQueryBuilder("service")
            .leftJoinAndSelect("service.users", "user")
            .getMany();
        function byField(field) {
            return (a, b) => a[field] > b[field] ? -1 : 1;
        }
        return services.sort(byField('users'));
    }

    async findServiceById(id: number): Promise<Service> {
        return getRepository(Service)
            .createQueryBuilder("service")
            .where("service.id = :id", {id})
            .getOne();
    }

    async updateServiceById(id: number, updateServiceDto: UpdateServiceDto) {
        await getRepository(Service)
            .createQueryBuilder("service")
            .update(Service)
            .set(updateServiceDto)
            .where("id = :id", {id})
            .execute();
    }

    async removeServiceById(id: number): Promise<void> {
        await getRepository(Service)
            .createQueryBuilder("service")
            .delete()
            .from(Service)
            .where("id = :id", {id})
            .execute();
    }
}
