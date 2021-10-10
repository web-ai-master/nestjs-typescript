import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Post } from 'src/modules/posts/models/entities/post.entity';
 
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Post, (post: Post) => post.categories)
    posts: Post[];
}
 