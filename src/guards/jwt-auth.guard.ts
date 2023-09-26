import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable,UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { log } from 'console';


@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService){}

    canActivate(context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        //  return true
        const req  = context.switchToHttp().getRequest()
        const authHeader = req.headers.authorization
        
        if(!authHeader){
            throw new UnauthorizedException({
                message:"Foydalanuvchi avtorizatsiyadan o'tmagan1"
            })
        }

        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]
        if(bearer !=='Bearer' || !token){ 
            throw new UnauthorizedException({
                message:"Foydalanuvchi avtorizatsiyadan o'tmagan2"
            })
        }
        let user:any
        console.log(token);
        
        try {
            user = this.jwtService.verify(token)
            console.log(user);
            
        } catch (error) {
            console.log(error);
            
            throw new UnauthorizedException({
                message:"Foydalanuvchi avtorizatsiyadan o'tmagan3"
            })
        }
        req.user=user;
        
        return true
        

    }  



}