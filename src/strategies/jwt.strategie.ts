import { PrismaService } from './../services/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { user } from '@prisma/client';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'apato-token',
    });
  }

  async validate(payload: any): Promise<user> {
    const { iat, exp, id } = payload;

    const timeDiff: number = exp - iat;

    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
