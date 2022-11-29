import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  price: number;

  @IsOptional()
  @IsString()
  detail: string;

  @IsOptional()
  area: number;
}
