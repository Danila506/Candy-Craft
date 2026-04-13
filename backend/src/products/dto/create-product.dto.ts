// dto/create-product.dto.ts
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  sku?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  slug?: string;

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

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  @IsOptional()
  cartId?: number;
}
