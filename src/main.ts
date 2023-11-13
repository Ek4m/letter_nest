import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationErrorFilter } from './exception_handler';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalFilters(new ValidationErrorFilter());
  await app.listen(3001);
}
bootstrap();
