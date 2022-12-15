import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
export class UpdateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phone: string;

  @IsOptional()
  @IsString()
  address: string;
}
