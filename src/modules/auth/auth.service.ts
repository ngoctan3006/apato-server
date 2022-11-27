import { compare_password } from './../../decorators/hash-password.decorator';
import { ConfigService } from '@nestjs/config';
import { user } from '@prisma/client';
import { CreateUserInput } from './dto/register.dto';
import { PrismaService } from 'src/services/prisma.service';
import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, LoginInput } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async register(input: CreateUserInput): Promise<LoginResponse> {
    const find_option = {};
    if (input.phone) {
      find_option['OR'] = [
        {
          email: input.email,
        },
        {
          phone: input.phone,
        },
      ];
    } else {
      find_option['email'] = input.email;
    }
    const count: number = await this.prisma.user.count({
      where: find_option,
    });

    if (count !== 0) {
      throw new BadRequestException('Email/SĐT đã được sử dụng');
    }
    const new_user: user = await this.userService.create_new_user(input);
    const { access_token, refresh_token } = await this.generate_token(new_user);
    return {
      access_token,
      refresh_token,
      user_info: {
        email: new_user.email,
        name: new_user.name,
        role: new_user.role,
        phone: new_user.phone,
        address: new_user.address,
      },
    };
  }

  async login(input: LoginInput): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản');
    }
    const valid = await compare_password(input.password, user.password);
    if (!valid) {
      throw new BadRequestException('Mật khẩu không đúng');
    }
    const { access_token, refresh_token } = await this.generate_token(user);
    return {
      access_token,
      refresh_token,
      user_info: {
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        address: user.address,
      },
    };
  }

  async generate_token(
    user: user,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = {
      id: user.id,
      role: user.role,
    };
    const access_token: string = await this.jwtService.sign(payload, {
      secret: 'apato-token',
      expiresIn: '48h',
    });
    const refresh_token: string = await this.jwtService.sign(payload, {
      secret: 'apato-token',
      expiresIn: '7d',
    });
    return { access_token, refresh_token };
  }
}
