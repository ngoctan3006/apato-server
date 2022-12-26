import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  detail: string;

  @IsNotEmpty()
  area: number;

  @IsOptional()
  @IsString()
  district: string;
}
