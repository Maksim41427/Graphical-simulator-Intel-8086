import { IsEmail, IsString, IsNotEmpty, IsJSON} from "@nestjs/class-validator"

export class CreateProgramDto {

    @IsString()
    @IsNotEmpty()
    title: string
    
    @IsJSON()
    @IsNotEmpty()
    file: string
}
