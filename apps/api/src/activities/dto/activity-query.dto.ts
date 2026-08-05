import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';


export class ActivityQueryDto {


@ApiPropertyOptional({
 default:1
})
@IsOptional()
@IsInt()
page?:number=1;



@ApiPropertyOptional({
 default:20
})
@IsOptional()
@IsInt()
limit?:number=20;


}