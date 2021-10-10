import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from 'typeorm';

import { User } from 'src/modules/users/models/entities/user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => User, (author: User) => author.posts)
    public author: User;
}