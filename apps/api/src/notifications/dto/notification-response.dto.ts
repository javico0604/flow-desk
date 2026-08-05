import { ApiProperty } from '@nestjs/swagger';


export class NotificationResponseDto {


 @ApiProperty()
 id!:number;


 @ApiProperty()
 message!:string;


 @ApiProperty()
 read!:boolean;


 @ApiProperty()
 createdAt!:Date;


}