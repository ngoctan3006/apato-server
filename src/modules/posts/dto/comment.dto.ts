import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CommentPost {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsInt()
  rating: number;
}
