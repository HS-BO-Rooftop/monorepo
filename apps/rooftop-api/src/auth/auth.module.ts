import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from '../application/application.module';
import { ApplicationService } from '../application/application.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenEntity } from './entities/refresh-token.entity';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    ApplicationModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
