import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToMany(() => User, user => user.services)
    users: User[];
}
