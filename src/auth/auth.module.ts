import { Module, forwardRef } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Role } from "src/roles/models/role.module";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    imports:[SequelizeModule.forFeature([Role]),
        forwardRef(()=>UsersModule),
        JwtModule.register({
            secret:'MyVerySECRETkey',
            signOptions:{
                expiresIn:'24h'
            },
            global:true
        })
    ],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService,JwtModule],
})
export class AuthModule {}