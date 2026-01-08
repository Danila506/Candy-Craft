import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsersDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}