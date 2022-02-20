import {IsEmail, IsNotEmpty} from 'class-validator';

export class CreateUserDto {
    readonly id: number
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
    @IsNotEmpty()
    readonly name: string
}
