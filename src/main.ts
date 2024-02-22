import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Seeder } from './seeder.providers';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const seeder = app.get(Seeder);

    await seeder.seed();
    await app.listen(3000);
}
bootstrap();
