import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Score } from "./score.entity";

@Entity()
export class User {
    @PrimaryColumn()
    name: string;

    @Column()
    isAdmin: boolean;

    @OneToOne(() => Score, (score) => score.user)
    @JoinColumn()
    score: Score
}
