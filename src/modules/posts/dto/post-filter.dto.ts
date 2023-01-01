import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostFilter {
  @IsOptional()
  @IsInt()
  pageSize: number;

  @IsOptional()
  @IsInt()
  pageIndex: number;

  @IsOptional()
  @IsInt()
  priceStart: number;

  @IsOptional()
  @IsInt()
  priceEnd: number;

  @IsOptional()
  @IsNumber()
  areaStart: number;

  @IsOptional()
  @IsNumber()
  areaEnd: number;

  @IsOptional()
  @IsString()
  searchValue: string;

  @IsOptional()
  @IsString()
  district: string;
}
