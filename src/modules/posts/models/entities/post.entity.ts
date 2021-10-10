import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

import { User } from 'src/modules/users/models/entities/user.entity';
import { Category } from 'src/modules/categories/models/entities/category.entity';

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

    @ManyToMany(() => Category, (category: Category) => category.posts)
    @JoinTable()
    public categories: Category[];
}