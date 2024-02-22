import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.score, {eager: true})
    user: User

    @Column()
    score: number;
}
