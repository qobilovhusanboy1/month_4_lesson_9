import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsEmail, IsStrongPassword} from 'class-validator'

export class CreateUserDto {

    @ApiProperty({example:'user1',description:'Foydalanuvchi nomi'})

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        example:'user1@gmail.uz',
        description:"Foydalanuchi emaili"
    })

    @IsEmail()
    readonly email: string;


    @ApiProperty({example:'Uzbek1$t0n',description:'foydalanuchi profili'})
    @IsStrongPassword({minLength:5})
    readonly password: string;
}
