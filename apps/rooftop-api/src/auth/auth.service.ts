import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { ApplicationsService } from '../applications/applications.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import {
  RefreshTokenPayload,
  isRefreshTokenPayload
} from './dto/refresh-token-payload.dto';
import { TokenPairDto } from './dto/token-pair.dto';
import { RefreshTokenEntity } from './entities/refresh-token.entity';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  private static readonly ACCESS_TOKEN_LIFETIME = 15 * 60; // 15m
  private static readonly REFRESH_TOKEN_LIFETIME = 90 * 24 * 60 * 60; // 90d

  private applicationSecret: string;

  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly repo: Repository<RefreshTokenEntity>,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly appService: ApplicationsService
  ) {
    this.appService.boostrapDone.subscribe((done) => {
      if (done === false) {
        return;
      }
      this.applicationSecret = this.configService.get<string>('CLIENT_SECRET');
      if (!this.applicationSecret) {
        throw new Error('CLIENT_SECRET is not set');
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
      expiresIn: AuthService.REFRESH_TOKEN_LIFETIME,
    });

    const user = await this.userService.findOne(userId);

    const accessToken = jwt.sign(
      {
        sub: userId,
        name: `${user.firstName} ${user.lastName}`,
        clientId,
        isAdmin: user.isAdmin,
      },
      application.secret,
      {
        expiresIn: AuthService.ACCESS_TOKEN_LIFETIME,
      }
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: AuthService.ACCESS_TOKEN_LIFETIME,
      token_type: 'Bearer',
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
   * @returns The new token pair.
   */
  async refreshToken(
    refreshToken: string
  ): Promise<TokenPairDto> {
    const payload = jwt.decode(refreshToken) as RefreshTokenPayload;
    const application = await this.appService.findOne(payload.clientId);

    if (!application) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const decoded = jwt.verify(refreshToken, application.secret);

    if (!decoded) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (!isRefreshTokenPayload(decoded)) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findOne(decoded.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenPair = await this.generateTokenPair(user.id, payload.clientId);

    // Delete the old refresh token
    await this.repo.delete({
      token: refreshToken,
    });

    return tokenPair;
  }

  // Validates a token and the user.
  public async validate(token: string): Promise<UserEntity | null> {
    const payload = jwt.verify(token, this.applicationSecret) as JwtPayload;
    if (!payload) {
      return null;
    }

    return await this.userService.findOne(payload.sub);
  }
}
