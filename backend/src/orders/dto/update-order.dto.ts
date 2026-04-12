import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatusKey {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export class UpdateOrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatusKey)
  status?: OrderStatusKey;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  statusReason?: string;

  @IsOptional()
  @IsInt()
  totalPrice?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderItemDto)
  items?: UpdateOrderItemDto[];
}
