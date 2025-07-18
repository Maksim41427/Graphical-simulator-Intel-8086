import { IsString, IsNotEmpty} from "@nestjs/class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    login: string
    
    @IsString()
    @IsNotEmpty()
    password: string
}
