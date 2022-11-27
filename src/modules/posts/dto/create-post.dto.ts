import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsArray()
  image: [string];

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  detail: string;
}
