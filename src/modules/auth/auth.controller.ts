import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/models/dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './models/dto/loginUser.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    /* create new user */
    @Post('/register')
    register(@Body() createUserDto:CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    
    /* login user */
    @Post('/login')
    login(@Body() loginUserDto:LoginUserDto) {
        return this.authService.login(loginUserDto);
    }
}
