import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AssignIssueDto {

  @ApiProperty()
  @IsInt()
  assigneeId!:number;

}