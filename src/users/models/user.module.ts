import { ApiProperty } from '@nestjs/swagger';
import {Table, Column, DataType, Model, BelongsToMany, HasMany} from 'sequelize-typescript'
import { Post } from 'src/posts/models/post.entity';
import { Role } from 'src/roles/models/role.module';
import { UserRoles } from 'src/roles/models/user-roles.module';

interface IUser {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, IUser> {

    @ApiProperty({example:1,description:"unikal ID"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({example:"name", description:"Ism qoyish uchun"})
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @ApiProperty({example:"kakndw@gmail.uz",description:"email manzili"})
    @Column({
        type: DataType.STRING,
    })
    email: string;

    @ApiProperty({example:"Uzbek1$t0n",description:"password qoyish uchun"})
    @Column({
        type: DataType.STRING,
    })
    password: string;

    @ApiProperty({example:false,description:"Foydalanuvchi onlayn yoki onlaynmaligini bilish uchun"})
    @Column ({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_Active: boolean;


    @ApiProperty({example:['Roles'],description:'Foydalanuvchi rollar'})
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(()=>Post)
    posts: Post[];
}
