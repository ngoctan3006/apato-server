import { JwtAuthGuard } from './../guards/jwt.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';

export const ROLES_KEY = 'roles';
export const Auth = (...apis: string[]) => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, apis),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
};
