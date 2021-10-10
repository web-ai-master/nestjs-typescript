import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Address } from "./address.entity";
import { Exclude } from "class-transformer";
import { Post } from "src/modules/posts/models/entities/post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @OneToOne(() => Address, {
        eager: true, // related entities always to be included while fetched
        cascade: true // save an address while saving a user
    })
    @JoinColumn()
    public address: Address;

    @OneToMany(() => Post, (post: Post) => post.author)
    public posts: Post[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}