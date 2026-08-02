import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddMemberDto {

  @ApiProperty()
  @IsInt()
  userId!: number;

}