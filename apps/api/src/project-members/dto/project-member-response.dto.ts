import { ApiProperty } from "@nestjs/swagger";
import { ProjectRole } from '@prisma/client';

class UserMemberDto {

  @ApiProperty()
  id!:number;

  @ApiProperty()
  name!:string;

  @ApiProperty()
  email!:string;

}


export class ProjectMemberResponseDto {

  @ApiProperty()
  id!:number;

  @ApiProperty()
  projectId!:number;

  @ApiProperty()
  userId!:number;

  @ApiProperty({
    enum: ProjectRole
  })
  role!: ProjectRole;

  @ApiProperty()
  createdAt!:Date;


  @ApiProperty({
    type:UserMemberDto
  })
  user!:UserMemberDto;

}