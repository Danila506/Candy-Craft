import {
  IsArray,
  IsEnum,
  IsInt,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'



class CreateOrderItemDto {
  @IsInt()
  productId: number


  @IsInt()
  @Min(1)
  quantity: number
}

export class CreateOrderDto {
  @IsInt()
  userId: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[]
}
