import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumberString,
} from 'class-validator';
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsNumberString()
  room_count: number;

  @IsNotEmpty()
  @IsNumberString()
  area: number;

  @IsOptional()
  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  university: string;
}
