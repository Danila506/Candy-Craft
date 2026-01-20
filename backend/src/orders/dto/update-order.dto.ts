import { IsArray, IsEnum, IsInt, IsOptional, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatusKey {
    PENDING = "PENDING",
    PAID = "PAID",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
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
    @IsInt()
    totalPrice?: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateOrderItemDto)
    items?: UpdateOrderItemDto[];
}
