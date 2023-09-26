import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel} from '@nestjs/sequelize';
import { Role } from './models/role.module';



@Injectable()
export class RolesService {
  constructor (@InjectModel(Role) private roleRepository: typeof Role) {}

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.create(createRoleDto);
  }

  findAll(): Promise<Role[]> {
    return this.roleRepository.findAll({include: {all: true}});
  }

  findOne(id: number): Promise<Role> {
    return this.roleRepository.findByPk(id, {include: {all: true}});
  }

  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({where: {value}, include: {all: true}});
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.update(updateRoleDto, {where: {id}, returning: true});
    return role[1][0]
  }

  remove(id: number): Promise<number> {
    return this.roleRepository.destroy({where: {id}})
  }
}
