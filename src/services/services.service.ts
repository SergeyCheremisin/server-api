import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Service} from "./entities/service.entity";

@Injectable()
export class ServicesService {
  constructor(
      @InjectRepository(Service)
      private servicesRepository: Repository<Service>,
  ) {}

  create(createServiceDto: CreateServiceDto) {
    return this.servicesRepository.insert(createServiceDto);
  }

  findAll(): Promise<Service[]> {
    return this.servicesRepository.find();
  }

  findOne(id: number): Promise<Service> {
    return this.servicesRepository.findOne(id);
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.servicesRepository.findOne(id);
    await this.servicesRepository.update(updateServiceDto, service);
  }

  async remove(id: number): Promise<void> {
    await this.servicesRepository.delete(id);
  }
}
