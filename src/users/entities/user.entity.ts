import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {Service} from "../../services/entities/service.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @ManyToMany(() => Service, service => service.users)
    @JoinTable({name: 'Subscriptions'})
    services: Service[];
}
