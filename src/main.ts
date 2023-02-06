import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { CommonModule } from './services/common.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.select(CommonModule).get(ConfigService);
  const port = config.get<number>('PORT');
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cors({
      origin: '*',
    }),
  );
  await app.listen(process.env.PORT || port || 4000);
}
bootstrap();
