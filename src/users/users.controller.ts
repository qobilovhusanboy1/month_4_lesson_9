import { Roles } from './../decorators/roles-auth.decoration';
import { ActivateUserDto } from './dto/activate-user.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.module';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Foydalanuvchilar")
@Roles("USER")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary:'Foydalanuvchi yaratish'})
  @ApiResponse({status: 200, description:"Token"})
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary:"Foydalanuvchi Ko'rish"})
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({summary:"Role qo'shish"})
  @HttpCode(200)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('add_role')
  async addRole(@Body() addRoleDto: AddRoleDto): Promise<User> {
    return this.usersService.addRole(addRoleDto)
  }


  @ApiOperation({summary:"Role olib tashlash"})
  @HttpCode(200)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('remove_role')
  async removeRole(@Body() removeRoleDto: RemoveRoleDto): Promise<User> {
    return this.usersService.removeRole(removeRoleDto)
  }

  
  @ApiOperation({summary:"Activ foydalanuvchilar"})
  @HttpCode(200)
  @Post('activate_user')
  async activateUser(@Body() activateUserDto: ActivateUserDto): Promise<User> {
    return this.usersService.activateUser(activateUserDto)
  }


  @ApiOperation({summary:"Bitta Foydalanuvchini ko'rish"})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({summary:"Foydalanuvchini ma'lumotlarini yangilash"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({summary:"Foydalanuvchini o'chirish"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
