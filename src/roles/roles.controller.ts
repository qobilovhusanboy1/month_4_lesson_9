import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './models/role.module';
import { ApiOperation } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({summary:"Role yaratish"})
  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }
  @Get(':value')
  getRoleByValue(@Param('value') value: string): Promise<Role> {
    return this.rolesService.getRoleByValue(value);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.rolesService.remove(+id);
  }
}
