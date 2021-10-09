import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService:UsersService) { }

    /* get all users with address */
    @Get('/users-with-address')
    getAllUsersWithAddress(){
        return this.usersService.getAllUsersWithAddress();
    }
}
