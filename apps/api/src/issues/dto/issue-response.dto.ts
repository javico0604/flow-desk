import { ApiProperty } from '@nestjs/swagger';
import { IssuePriority } from '@prisma/client';


export class IssueResponseDto {

  @ApiProperty()
  id!: number;


  @ApiProperty()
  title!: string;


  @ApiProperty({
    required:false
  })
  description?: string;


  @ApiProperty({
    enum: IssuePriority
  })
  priority!: IssuePriority;


  @ApiProperty()
  position!: number;


  @ApiProperty()
  projectId!: number;


  @ApiProperty()
  boardId!: number;


  @ApiProperty()
  columnId!: number;


  @ApiProperty()
  creatorId!: number;


  @ApiProperty({
    required:false
  })
  assigneeId?: number;


  @ApiProperty()
  createdAt!: Date;


  @ApiProperty()
  updatedAt!: Date;

}