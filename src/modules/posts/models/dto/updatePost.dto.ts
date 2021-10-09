import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content: string;
}