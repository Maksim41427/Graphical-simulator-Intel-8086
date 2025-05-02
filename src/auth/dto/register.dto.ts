import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    login: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
  }
  
  export default RegisterDto;