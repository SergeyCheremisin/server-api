import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
    const config = await app.get(ConfigService);
    const port = config.get<number>('PORT');
    await app.listen(port || 3000);
}

bootstrap();
