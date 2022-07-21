import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { TokenPairDto } from './dto/token-pair.dto';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ApplicationService } from '../application/application.service';
import {
  isRefreshTokenPayload,
  RefreshTokenPayload,
} from './dto/refresh-token-payload.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  private applicationSecret: string;

  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly repo: Repository<RefreshTokenEntity>,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly appService: ApplicationService
  ) {
    this.appService.boostrapDone.subscribe(() => {
      this.applicationSecret =
        this.configService.get<string>('APPLICATION_SECRET');
      if (!this.applicationSecret) {
        throw new Error('APPLICATION_SECRET is not set');
      }
    });
  }

  /**
   * Generates a new refresh token for the user.
   * Does not check if the user is valid.
   * @param userId The user id.
   * @param clientId The id of the client that requested the token.
   */
  async generateTokenPair(
    userId: string,
    clientId: string
  ): Promise<TokenPairDto> {
    const application = await this.appService.findOne(clientId);
    if (!application) {
      throw new Error('Application not found');
    }

    const refreshTokenPayload: RefreshTokenPayload = {
      clientId,
      sub: userId,
    };

    const refreshToken = jwt.sign(refreshTokenPayload, this.applicationSecret, {
      expiresIn: '90d',
    });

    const accessToken = jwt.sign(
      {
        sub: userId,
        clientId,
      },
      this.applicationSecret,
      {
        expiresIn: '15m',
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Creates a new token pair for the user using their credentials.
   */
  async loginUser(
    email: string,
    password: string,
    clientId: string
  ): Promise<TokenPairDto> {
    const user = await this.userService.findOneWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokenPair(user.id, clientId);
  }

  /**
   * Creates a new token pair for the user using their refresh token.
   * @param refreshToken The refresh token.
   * @param clientId The id of the client that requested the token.
   * @returns The new token pair.
   */
  async validateRefreshToken(
    refreshToken: string,
    clientId: string
  ): Promise<TokenPairDto> {
    const application = await this.appService.findOne(clientId);

    const decoded = jwt.verify(refreshToken, application.secret);

    if (!decoded) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (!isRefreshTokenPayload(decoded)) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (decoded.clientId !== clientId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findOne(decoded.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenPair = await this.generateTokenPair(user.id, clientId);

    // Delete the old refresh token
    await this.repo.delete({
      token: refreshToken,
    });

    return tokenPair;
  }
}