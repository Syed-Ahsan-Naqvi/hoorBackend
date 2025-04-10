import { IsEmail, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateCategoryDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: "Category name is required" })
  name: string;

  @IsNotEmpty({ message: "Category color is required" })
  color: string;

  //   @IsNotEmpty({ message: "Email is required" })
  //   @IsEmail({}, { message: "Invalid Email" })
  //   email: string;

  //   @IsNotEmpty({ message: "Password is required" })
  //   password: string;

  //   @IsOptional()
  //   role: string;
}

// export class LoginUserDto {
//   @IsOptional()
//   @IsNumber()
//   id: number;

//   @IsNotEmpty({ message: "Email is required" })
//   email: string;

//   @IsNotEmpty({ message: "Password is required" })
//   password: string;

//   @IsOptional()
//   role: string;
// }
