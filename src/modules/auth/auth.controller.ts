import { CreateUserInput } from './dto/register.dto';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse, LoginInput } from './dto/login.dto';
import { Auth } from 'src/decorators/authentication.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() input: CreateUserInput): Promise<LoginResponse> {
    console.log(input);
    return await this.authService.register(input);
  }

  @Post('login')
  async login(@Body() input: LoginInput): Promise<LoginResponse> {
    return await this.authService.login(input);
  }
  @Auth('ADMIN')
  @Get()
  hello() {
    return 'string';
  }
}
