import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class MoveIssueDto {

  @ApiProperty()
  @IsInt()
  columnId!: number;


  @ApiProperty()
  @IsInt()
  position!: number;

}