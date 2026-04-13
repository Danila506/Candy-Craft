import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserAddressDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  label?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  street?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  house?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  apartment?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  entrance?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  floor?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  intercom?: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  postalCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  recipientName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  recipientPhone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  fullAddress?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
