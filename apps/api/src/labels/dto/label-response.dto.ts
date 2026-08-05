import { ApiProperty } from '@nestjs/swagger';

export class LabelResponseDto {

  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

}