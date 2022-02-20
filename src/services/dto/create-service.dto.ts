import {IsNotEmpty} from "class-validator";

export class CreateServiceDto {
    readonly id: number
    @IsNotEmpty()
    readonly title: string
    @IsNotEmpty()
    readonly description: string
}
