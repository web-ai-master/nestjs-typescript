import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;
}