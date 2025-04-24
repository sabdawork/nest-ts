import { json, raw, urlencoded } from 'express';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './lib/response';
import compression from 'compression';
import { isDeveloperMode } from './lib/constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') ?? 8000;

  app.use(helmet());
  app.use(cookieParser());
  app.use(compression());

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Additional Config
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));
  app.use('/webhook/xero', raw({ type: 'application/json' }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sabda Nest API')
    .setDescription('Sabda Nest API - API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const logger = new Logger('Bootstrap');
  await app.listen(port);

  const developerMode = isDeveloperMode();

  logger.log(
    `🚀 App running on ${developerMode ? 'Developer Mode' : 'Production Mode'} http://localhost:${port}`,
  );
  logger.log(`📚 Swagger Docs: http://localhost:${port}/docs`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
