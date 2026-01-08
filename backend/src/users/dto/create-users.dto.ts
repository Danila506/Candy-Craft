import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;


  @IsNotEmpty()
  email: string;
}