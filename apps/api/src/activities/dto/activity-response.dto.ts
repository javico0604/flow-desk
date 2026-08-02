import { ApiProperty } from '@nestjs/swagger';
import { ActivityType } from '@prisma/client';


export class ActivityResponseDto {


 @ApiProperty()
 id!:number;


 @ApiProperty({
  enum:ActivityType
 })
 action!:ActivityType;


 @ApiProperty({
  required:false
 })
 metadata?:object;


 @ApiProperty()
 createdAt!:Date;


 @ApiProperty()
 user!:{
  id:number;
  name:string;
  email:string;
 };


}