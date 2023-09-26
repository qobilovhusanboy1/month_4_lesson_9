import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.entity';
import { User } from 'src/users/models/user.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports:[SequelizeModule.forFeature(
    [Post,User]
  ),FilesModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports:[PostsService]
})
export class PostsModule {}
