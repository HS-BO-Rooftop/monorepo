import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from 'express';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!token) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.validate(token);
    request.user = user;

    if (!roles || roles.length === 0) {
      return true;
    }

    if (roles.includes('admin') ) {
      if (user.isAdmin) {
        return true;
      }
      throw new BadRequestException('User is not an admin');
    }

    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (!request.headers.authorization) {
      return undefined;
    }
    const [type, token] = request.headers.authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
