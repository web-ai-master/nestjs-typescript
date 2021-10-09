import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/models/dto/createUser.dto';
import { LoginUserDto } from './models/dto/loginUser.dto';

@Injectable()
export class AuthService {

    constructor(private usersService:UsersService, private jwtService:JwtService) { }

    /* create new user */
    async register(createUserDto: CreateUserDto) {
        const user = await this.usersService.createUser(createUserDto);
        return user;
    }

    /* login existing user */
    async login(loginUserDto: LoginUserDto) {
        const user = await this.validateUser(loginUserDto);
        const payload = {
            id: user.id
           
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    /* validate user */
    async validateUser(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.usersService.getUserByEmail(email);
        if (!user) {
            throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
        } else if (!(await user.validatePassword(password))) {
            throw new HttpException('You are not authorized', HttpStatus.UNAUTHORIZED);
        } else {
            return user;
        }
    }

}
