import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CustomCandyCakeConfigDto {
  @IsString()
  @IsIn(['custom_cake'])
  type: 'custom_cake';

  @IsString()
  @IsIn(['round', 'heart', 'square'])
  base: string;

  @IsString()
  @IsIn(['m', 'l'])
  size: string;

  @IsString()
  @IsIn(['kinder', 'merci', 'mix', 'premium'])
  sweetSet: string;

  @IsString()
  @IsIn(['pink', 'gold', 'white'])
  color: string;

  @IsString()
  @IsIn(['kinder-sticks', 'kitkat', 'merci-bars', 'wafer-rolls'])
  outerLayer: string;

  @IsString()
  @IsIn(['satin', 'lace', 'kraft', 'transparent'])
  wrapper: string;

  @IsString()
  @IsIn(['standard', 'window', 'gift', 'premium-box'])
  packaging: string;

  @IsString()
  @IsIn(['none', 'flowers', 'bow', 'topper'])
  decor: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  messageText?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100000)
  totalPrice?: number;
}

export class CreateCustomCandyCakeDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  quantity?: number;

  @ValidateNested()
  @Type(() => CustomCandyCakeConfigDto)
  config: CustomCandyCakeConfigDto;
}
