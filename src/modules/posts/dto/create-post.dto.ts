import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  detail: string;

  @IsOptional()
  @IsString()
  room_count: string;

  @IsNotEmpty()
  @IsString()
  area: string;

  @IsOptional()
  tags: string[];

  @IsOptional()
  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  university: string;
}
