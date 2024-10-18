import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export enum Level {
    DEBUTANT = 'DEBUTANT',
    INTERMEDIAIRE = 'INTERMEDIAIRE',
    AVANCE = 'AVANCE',
}

export class CreateCourseDto {  
@ApiProperty({
    required: true,
    description: 'The title of the course',
})    
@IsNotEmpty()
@IsString()
title: string;
@ApiProperty({
    required: true,
    description: 'The description of the course',
})
@IsNotEmpty()
@IsString()
description:string;
@ApiProperty({
    required: true,
    description: 'The level of the course',
})
@IsEnum(Level, { message: 'The level of the course must be one of the following values: DEBUTANT, INTERMEDIAIRE, AVANCE' })
level:Level;
}

