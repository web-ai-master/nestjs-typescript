import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './models/dto/createUser.dto';
import { Address } from './models/entities/address.entity';

import { User } from './models/entities/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

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
        const user = await this.usersRepository.create(createUserDto);
      
        try {
            await this.usersRepository.save(user); 
        } catch (err) {
            if(err.code === 'ER_DUP_ENTRY') {
                throw new HttpException('This email already exists', HttpStatus.CONFLICT);
            } else {
                throw new InternalServerErrorException();
            }
        }
        delete user.password;
        return user;   
    }

    /* get all addresses with users */
    async getAllUsersWithAddress() {
        return await this.usersRepository.find({ relations: ['address'] });
    }
}
