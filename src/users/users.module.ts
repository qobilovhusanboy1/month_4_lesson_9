import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/user.module';
import { Role } from 'src/roles/models/role.module';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/models/user-roles.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Post } from 'src/posts/models/post.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles,Post]),
    RolesModule,
    forwardRef(()=>AuthModule)
    ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
