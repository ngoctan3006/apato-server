import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { decodeUserFromHeader } from 'src/helpers/decode-authorization';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      return data ? request.user[data] : request.user;
    }
    try {
      return decodeUserFromHeader(request.headers);
    } catch (_) {
      return;
    }
  },
);
