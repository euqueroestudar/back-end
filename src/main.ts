import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { OpenAPI } from './docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  OpenAPI.instance(app);
  await app.listen(3000);
}
bootstrap();
