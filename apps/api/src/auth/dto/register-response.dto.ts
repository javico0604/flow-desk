import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength, IsNumber } from "class-validator";

export class RegisterResponseDto {
    @ApiProperty()
    @IsNumber()
    id!: number;

    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @MinLength(6)
    password!: string;
}