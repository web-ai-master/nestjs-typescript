import { IsNotEmpty, IsString } from 'class-validator';

export class createPostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}