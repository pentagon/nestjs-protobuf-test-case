import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ServiceExecutionExceptionFilter,
  ServiceValidationExceptionFilter,
} from './api.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ServiceValidationExceptionFilter());
  app.useGlobalFilters(new ServiceExecutionExceptionFilter());
  await app.listen(3000);
}
bootstrap();
