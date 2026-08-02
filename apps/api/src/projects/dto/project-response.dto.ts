import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponseDto {

  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty({
    required: false
  })
  description?: string;

  @ApiProperty()
  ownerId!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

}