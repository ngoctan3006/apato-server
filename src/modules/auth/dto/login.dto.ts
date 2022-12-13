import { ROLE } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(8)
  password: string;
}

export class LoginResponse {
  access_token: string;
  refresh_token: string;
  user_info: UserInfo;
}

export class UserInfo {
  name: string;
  email: string;
  role: ROLE;
  phone: string;
  address: string;
  status: boolean;
}
