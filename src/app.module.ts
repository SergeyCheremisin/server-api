import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./users/entities/user.entity";
import {Service} from "./services/entities/service.entity";

@Module({
  imports: [UsersModule, ServicesModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'chs',
    password: 'qwerty',
    database: 'chs',
    entities: [User, Service],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
