import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus} from '@nestjs/common';
import {ServicesService} from './services.service';
import {CreateServiceDto} from './dto/create-service.dto';
import {UpdateServiceDto} from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.createNewService(createServiceDto);
    }

    @Get()
    findAll() {
        return this.servicesService.findAllServices();
    }

    @Get('/popular')
    findPopular() {
        return this.servicesService.findPopularServices();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.servicesService.findServiceById(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateServiceDto: UpdateServiceDto) {
        return this.servicesService.updateServiceById(id, updateServiceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.servicesService.removeServiceById(+id);
    }
}
