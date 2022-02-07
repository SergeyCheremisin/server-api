import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createNewUser(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @Get(':id/services')
  getServiceForUserById(@Param('id') id: string) {
    return this.usersService.getServiceForUserById(+id);
  }

  @Patch(':id')
  addServiceForUser(@Param('id') user_id: string, @Body('service_id') service_id: string) {
    return this.usersService.addServiceForUser(+user_id, +service_id);
  }

  @Delete(':id')
  removeUserById(@Param('id') id: string) {
    return this.usersService.removeUserById(+id);
  }
}
