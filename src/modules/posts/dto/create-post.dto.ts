import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
}
