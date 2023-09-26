import { LoginDto } from './dto/login-auth';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { User } from "src/users/models/user.module";

@Injectable()
export class AuthService{
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    async registration(userDto:CreateUserDto){
        const condidate = await this.userService.getUserByEmail(userDto.email);
        if(condidate){
            throw new HttpException(
                'Bunday foydanaluvchi mavjud',
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashedPassword = await bcrypt.hash(userDto.password,7)
        const user = await this.userService.create({
            ...userDto,
            password:hashedPassword
        })
        console.log(user);
        const users = await this.generateToken(user)
        console.log(users);
        
        return users
    }

    private async generateToken(user:User){
        const payload = {email:user.email, id:user.id,roles:user.roles}

        return {token:this.jwtService.sign(payload)};
    }

    async login(loginDto:LoginDto){
        const user = await this.validateUser(loginDto)
        if(!user){
            throw new UnauthorizedException("Email yoki parol notog'ri")
        }
        return this.generateToken(user)
    }

    private async validateUser(loginDto:LoginDto){
        const user = await this.userService.getUserByEmail(loginDto.email);
        if(!user){
            throw new UnauthorizedException("Email yoki parol noto'ri")
        }

        const validPassword = await bcrypt.compare(
            loginDto.password,
            user.password
        );
        if(validPassword){
            return user;
        }
        throw new UnauthorizedException("Email yoki parol noto'g'ri")
    }

}