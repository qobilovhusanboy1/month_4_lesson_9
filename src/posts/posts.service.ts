import { FilesService } from './../files/files.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.entity';
import { where } from 'sequelize';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepostory:typeof Post,
    private readonly filesService:FilesService,
  ){}

  async create(createPostDto: CreatePostDto,image:any) {

    const filename = await this.filesService.createFile(image)
    const post  = await this.postRepostory.create({
      ...createPostDto,
      image:filename
    })
    return post
    
  }

  async findAll():Promise<Post[]> {
    const all = await this.postRepostory.findAll()
    return all;
  }

  async findOne(id: number) {
    const one = await this.postRepostory.findByPk(id)
    return one;
  }

  async update(id: number, updatePostDto: UpdatePostDto,image:any) {
    console.log(updatePostDto);
    
    const filename = await this.filesService.createFile(image)
    const post  = await this.postRepostory.update(updatePostDto,{where: {id: id}})
    console.log(post);
    
    // const is_complete = await this.postRepostory.update(post,{where: {id:id},returning: true})
    // return is_complete;
    return post;
  }

  async remove(id: number) {
    const is_romeve = await this.postRepostory.destroy({where: {id:id}})
    return is_romeve;
  }
}
