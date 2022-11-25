import { CreateUserInput } from './dto/register.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse, LoginInput } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() input: CreateUserInput): Promise<LoginResponse> {
    return await this.authService.register(input);
  }

  @Post('login')
  async login(@Body() input: LoginInput): Promise<LoginResponse> {
    return await this.authService.login(input);
  }
}
