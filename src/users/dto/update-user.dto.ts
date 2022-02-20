import {PartialType} from '@nestjs/mapped-types';
import {CreateUserDto} from './create-user.dto';
import {IsEmail} from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    readonly id: number
    @IsEmail()
    readonly email: string
    readonly name: string
}
