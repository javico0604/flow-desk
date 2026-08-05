import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { IssuePriority } from '@prisma/client';

export class CreateIssueDto {

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: IssuePriority
  })
  @IsEnum(IssuePriority)
  priority!: IssuePriority;

  @ApiProperty()
  @IsInt()
  position!: number;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsInt()
  assigneeId?: number;

}