import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { AppModule } from './app/app.module';
import { TypeOrmExceptionFilter } from './common/exception-filters/typeorm-exception-filter';
import { ShutdownService } from './shutdown/shutdown.service';

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  if (!configService) {
    throw new Error('Config service not found');
  }

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      transform: true,
    })
  );
  app.useGlobalFilters(new TypeOrmExceptionFilter());

  app.enableCors();

  // Register shutdown service
  app.get(ShutdownService).subscribeToShutdown(() => {
    console.log('Shutting down');
    app.close();
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  // Setup Swagger
  const documentBuilder = new DocumentBuilder()
    .setTitle('Rooftop API')
    .setDescription('Rooftop API')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Auth')
    .addTag('Boards')
    .addTag('Sensors')
    .addTag('Configurations')
    .addTag('Sensor Types')
    .addTag('Sensor Interfaces')
    .addBearerAuth();

  if (process.env.NODE_ENV === 'development') {
    documentBuilder.addServer(`http://localhost:${port}`);
  } else {
    documentBuilder.addServer(`http://ontop.hs-bochum.de`);
  }

  const config = documentBuilder.build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Add mqtt client
  const mqttUrl = configService.get('MQTT_URL');
  const mqttUsername = configService.get('MQTT_USERNAME');
  const mqttPassword = configService.get('MQTT_PASSWORD');
  if (!mqttUrl) {
    throw new Error('MQTT_URL not set');
  }
  if (!mqttUsername) {
    throw new Error('MQTT_USERNAME not set');
  }
  if (!mqttPassword) {
    throw new Error('MQTT_PASSWORD not set');
  }
  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: mqttUrl,
      username: mqttUsername,
      password: mqttPassword,
    },
  });

  Logger.log(`Connecting to MQTT at ${mqttUrl}...`);
  await app.startAllMicroservices();
  Logger.log(`Connected to MQTT`);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
