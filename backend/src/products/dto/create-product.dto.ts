// dto/create-product.dto.ts
import { IsString, IsNumber, IsOptional, IsBoolean, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;
  
  @IsString()
  @IsOptional()
  description: string;
  
  @IsNumber()
  @Min(0)
  price: number;
  
  @IsString()
  @IsOptional()
  imageUrl: string;
  
  @IsNumber()
  @Min(0)
  @IsOptional()
  inStock: number;
  
  
  @IsNumber()
  categoryId: number;

  @IsNumber()
  @IsOptional()
  cartId?: number
}