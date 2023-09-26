import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsUppercase} from 'class-validator'

export class CreateRoleDto {
    @ApiProperty({example:"ADMIN",description:"Biron narsa kiritish uchun"})
    @IsNotEmpty()
    @IsUppercase()
    @IsString()
    readonly value: string;

    @ApiProperty({example:"skjif wfe",description:"Rolle haiqda ma'lumot"})
    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
