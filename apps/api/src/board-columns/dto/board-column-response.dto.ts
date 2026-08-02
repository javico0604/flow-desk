import { ApiProperty } from '@nestjs/swagger';

export class BoardColumnResponseDto {

  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  position!: number;

  @ApiProperty()
  boardId!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

}