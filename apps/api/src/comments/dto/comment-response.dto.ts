import { ApiProperty } from '@nestjs/swagger';


export class CommentResponseDto {

  @ApiProperty()
  id!: number;


  @ApiProperty()
  content!: string;


  @ApiProperty()
  issueId!: number;


  @ApiProperty()
  userId!: number;


  @ApiProperty()
  createdAt!: Date;


  @ApiProperty()
  updatedAt!: Date;


  @ApiProperty({
    required: false
  })
  user?: {
    id: number;
    name: string;
    email: string;
  };

}