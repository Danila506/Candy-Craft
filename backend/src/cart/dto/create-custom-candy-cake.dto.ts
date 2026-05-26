import {
  ArrayMinSize,
  IsIn,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CustomCandyCakeInnerLayerDto {
  @IsString()
  @IsIn(['milka', 'raffaello', 'kinder', 'ferrero', 'merci'])
  candyId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  percentage: number;
}

export class CustomCandyCakeConfigDto {
  @IsString()
  @IsIn(['custom_cake'])
  type: 'custom_cake';

  @IsString()
  @IsIn(['round', 'heart', 'square'])
  base: string;

  @IsString()
  @IsIn(['s', 'm', 'l', 'xl'])
  size: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CustomCandyCakeInnerLayerDto)
  innerLayer: CustomCandyCakeInnerLayerDto[];

  @IsString()
  @IsIn(['pink', 'gold', 'white'])
  color: string;

  @IsString()
  @IsIn([
    'kinder-chocolate',
    'kinder-bueno',
    'milka-baton',
    'twix',
    'rittersport',
    'kitkat',
    'snikers',
    'milkiway',
  ])
  outerLayer: string;

  @IsString()
  @IsIn(['satin', 'lace', 'kraft', 'transparent'])
  wrapper: string;

  @IsString()
  @IsIn(['standard', 'window', 'gift', 'premium-box'])
  packaging: string;

  @IsArray()
  @IsIn(['bow', 'topper'], { each: true })
  decor: string[];

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
