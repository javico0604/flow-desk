import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { IssuePriority } from '@prisma/client';


export class UpdatePriorityDto {

 @ApiProperty({
   enum:IssuePriority
 })
 @IsEnum(IssuePriority)
 priority!:IssuePriority;

}