import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { decodeUserFromHeader } from 'src/helpers/decode-authorization';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rolesMeta = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const requiredRoles =
      rolesMeta.length > 0 ? rolesMeta : ['ADMIN', 'USER', 'SELLER'];

    const request = context.switchToHttp().getRequest();
    const user = decodeUserFromHeader(request.headers);

    if (!user || typeof user === 'string') {
      throw new ForbiddenException();
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException();
    }
    return true;
  }
}
