import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {ServicesModule} from './services/services.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}),
        UsersModule,
        ServicesModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                type: config.get<'aurora-data-api'>('TYPEORM_CONNECTION'),
                username: config.get<string>('TYPEORM_USERNAME'),
                password: config.get<string>('TYPEORM_PASSWORD'),
                database: config.get<string>('TYPEORM_DATABASE'),
                port: config.get<number>('TYPEORM_PORT'),
                entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
                synchronize: true,
                autoLoadEntities: true,
                logging: true
            })
        })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
