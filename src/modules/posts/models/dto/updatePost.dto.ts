import { IsNumber, IsString } from 'class-validator';

export class UpdatePostDto {
    @IsNumber()
    id: number;

    @IsString()
    title: string;

    @IsString()
    content: string;
}