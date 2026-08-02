import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateBoardColumnDto {

  @ApiProperty()
  @IsString()
  name!: string;


  @ApiProperty()
  @IsInt()
  position!: number;

}