import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(port = process.env.PORT || 3000) {
  const startTime = new Date().getTime();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );

  await app.listen(port, () => {
    const now = new Date().getTime();
    Logger.log(`Started in ${now - startTime}ms`, 'App');
    Logger.log(`🎸 Running at http://localhost:${port}`, 'App');
    Logger.log(`♥️ Running at http://localhost:${port}/health`, 'App');
    Logger.log(`🤣 Running at http://localhost:${port}/graphql`, 'App');
  });
}

bootstrap();
