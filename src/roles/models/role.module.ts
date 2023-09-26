import {Table, Model, Column, DataType, BelongsToMany} from 'sequelize-typescript'
import { User } from 'src/users/models/user.module';
import { UserRoles } from './user-roles.module';
import { ApiProperty } from '@nestjs/swagger';


interface IRole {
    readonly value: string;
    readonly description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, IRole> {
    @ApiProperty({example:1,description:"Unikal ID"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({example:"value",description:"Biron narsa"})
    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true
    })  
    value: string;

    @ApiProperty({example:"description",description:"ma'lumot kirish uchun"})
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    description: string;

    @ApiProperty({example:['Roles'],description:"Foydalanuvchi rollari"})
    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}
