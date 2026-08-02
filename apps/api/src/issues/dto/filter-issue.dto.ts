import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { IssuePriority } from '@prisma/client';


export class FilterIssueDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;


  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  projectId?: number;


  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  assigneeId?: number;


  @ApiPropertyOptional({
    enum: IssuePriority
  })
  @IsOptional()
  @IsEnum(IssuePriority)
  priority?: IssuePriority;


  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  labelId?: number;

}