import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@Body() createPostDto: CreatePostDto,@UploadedFile() image:any) {
    console.log(image);
    
    return this.postsService.create(createPostDto,image);
  }

  @Get('get')
  findAll() {
    return this.postsService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string,@Body() updatePostDto: UpdatePostDto,@UploadedFile() image: any) {
    console.log(id,updatePostDto,image);
    
    return this.postsService.update(+id, updatePostDto,image);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
