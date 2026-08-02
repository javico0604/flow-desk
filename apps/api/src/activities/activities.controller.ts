import { UseGuards, Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ActivitiesService } from "./activities.service";
import { ActivityResponseDto } from "./dto/activity-response.dto";
import { ActivityQueryDto } from "./dto/activity-query.dto";

@ApiTags('Activities')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class ActivitiesController {


constructor(
 private service:ActivitiesService
){}



@ApiOkResponse({
 type:[ActivityResponseDto]
})
@Get('issues/:issueId/activity')
findAll(

 @Param('issueId',ParseIntPipe)
 issueId:number,

 @Query()
 query:ActivityQueryDto

){

 return this.service.findAll(issueId, query.page, query.limit);

}

@ApiOkResponse({
  type: ActivityResponseDto,
})
@Get('activity/:id')
findOne(
  @Param('id', ParseIntPipe)
  id:number
){

  return this.service.findOne(id);

}

}