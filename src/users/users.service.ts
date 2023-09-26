import { ActivateUserDto } from './dto/activate-user.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectModel} from '@nestjs/sequelize';
import { User } from './models/user.module';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor (@InjectModel(User) private userRepository: typeof User, private readonly roleService: RolesService ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.create(createUserDto)
    const role = await this.roleService.getRoleByValue("ADMIN")
    console.log(role);
    
    if (!role) {
      throw new BadRequestException("Role not found")
    }
    console.log(1);
    
    await newUser.$set('roles', [role.id]);
    await newUser.save();
    console.log(newUser);
    
    newUser.roles = [role]
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {email},
      include: {all: true}
    })
    return user
  }

  async addRole (addRoleDto: AddRoleDto): Promise<User> {
      const role = await this.roleService.getRoleByValue(addRoleDto.value)
      const user = await this.userRepository.findByPk(addRoleDto.userId)

      if (role && user) {
        await user.$add('roles', role.id);
        const updatedUser = await this.userRepository.findByPk(
          addRoleDto.userId,
          {include: {all: true}}
        )
          return updatedUser
      }
      throw new HttpException('User or Role not found', HttpStatus.NOT_FOUND); 
  }

  async removeRole (removeRoleDto: RemoveRoleDto): Promise<User> {
    const role = await this.roleService.getRoleByValue(removeRoleDto.value)
    const user = await this.userRepository.findByPk(removeRoleDto.userId)

    if (role && user) {
      await user.$remove('roles', role.id);
      const updatedUser = await this.userRepository.findByPk(
        removeRoleDto.userId,
        {include: {all: true}}
      )
        return updatedUser
    }
    throw new HttpException('User or Role not found', HttpStatus.NOT_FOUND); 
}

async activateUser (activateUserDto: ActivateUserDto): Promise<User> {
  const user = await this.userRepository.findByPk(activateUserDto.userId);

  
  
  if (!user) {
    throw new HttpException('User not found', HttpStatus.NOT_FOUND)
  }
  user.is_Active = true
  await user.save();
  return user
}


  findAll(): Promise<User[]> {
    return this.userRepository.findAll({include: {all: true}});
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(updateUserDto, {where: {id}, returning: true})
  }

  remove(id: number) {
    return this.userRepository.destroy({where: {id}})
  }
}
