import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonModule } from './services/common.module';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.select(CommonModule).get(ConfigService);
  const port = config.get<number>('port');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());
  await app.listen(4000);
}
bootstrap();
