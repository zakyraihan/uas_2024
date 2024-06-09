import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3300);
}
bootstrap();

// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";
// import { ValidationPipe } from "@nestjs/common";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidUnknownValues: true,
//       transform: true,
//       validateCustomDecorators: true,
//       transformOptions: {
//         enableImplicitConversion: true,
//       },
//     })
//   );
//   await app.listen(5002);
// }
// bootstrap();
