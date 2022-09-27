import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { AuthModule } from '../auth/auth.module';
import { BoardsModule } from '../configurations/boards/boards.module';
import { ShutdownModule } from '../shutdown/shutdown.module';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        logging: configService.get('DB_LOGGING', false),
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    AuthModule,
    ShutdownModule,
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: configService.get('EMAIL_TRANSPORT'),
        defaults: {
          from: '"OnTop Farmer Companion" <ontop@jan-krueger.eu>',
        },
        template: {
          dir: __dirname + '/assets/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ScheduleModule.forRoot(),
    BoardsModule,
    EventEmitterModule.forRoot(),
    WeatherModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
