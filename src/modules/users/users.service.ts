import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './models/dto/createUser.dto';

import { User } from './models/entities/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    /* get user by email */
    async getUserByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email })
        if(user) {
            return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    /* create new user */
    async createUser(createUserDto:CreateUserDto) {
        const newUser = await this.usersRepository.create(createUserDto);
        await this.usersRepository.save(newUser);
        return newUser;
    }
}
