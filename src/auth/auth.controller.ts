import { LoginDto } from './dto/login-auth';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post } from "@nestjs/common";



@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService) {}

    @Post('registration')
    registration(@Body() createUserDto:CreateUserDto){
        return this.authService.registration(createUserDto)
    }

    @HttpCode(200)
    @Post('login')
    login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto)
    }
}