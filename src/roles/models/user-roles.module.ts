
import {Table, Column, ForeignKey, Model, DataType} from 'sequelize-typescript'
import { User } from 'src/users/models/user.module';
import { Role } from './role.module';
import { ApiProperty } from '@nestjs/swagger';


@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

    @ApiProperty({example:1,description:"Unikal ID"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;
    
    @ApiProperty({example:1,description:"Foydalanuvchilarni ID si"})
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    userId: number;

    @ApiProperty({example:1,description:"Role id si"})
    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    roleId: number;
}
