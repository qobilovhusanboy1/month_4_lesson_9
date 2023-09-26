import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import {SequelizeModule} from '@nestjs/sequelize'
import { Role } from './roles/models/role.module';
import { UserRoles } from './roles/models/user-roles.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/models/user.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/models/post.entity';
import { FilesService } from './files/files.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

const {env} = process;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath:resolve(__dirname,"static")
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: Number(env.POSTGRES_PORT),
      host: env.POSTGRES_HOST,
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB_NAME,
      models: [Role, User, UserRoles,Post],
      autoLoadModels: true,
      logging: true,
    }),
    RolesModule,
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [FilesService],
})
export class AppModule {}
