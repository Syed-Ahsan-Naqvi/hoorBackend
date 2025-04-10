import { IsEmail, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid Email" })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @IsNotEmpty({ message: "Phone is required" })
  phone: string;

  @IsOptional()
  role: string;
}

export class LoginUserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @IsOptional()
  role: string;
}
