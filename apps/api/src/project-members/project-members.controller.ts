import {
 Controller,
 Post,
 Get,
 Delete,
 Body,
 Param,
 UseGuards,
 ParseIntPipe
} from '@nestjs/common';

import {
 ApiBearerAuth,
 ApiOkResponse,
 ApiTags
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectMembersService } from './project-members.service';
import { AddMemberDto } from './dto/add-member.dto';
import { ProjectMemberResponseDto } from './dto/project-member-response.dto';


@ApiTags('Project Members')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/members')
export class ProjectMembersController {


constructor(
 private service:ProjectMembersService
){}



@Post()
add(
 @Param('projectId', ParseIntPipe) projectId:number,
 @Body() dto:AddMemberDto
){

 return this.service.addMember(
   projectId,
   dto
 );

}



@ApiOkResponse({
  type: [ProjectMemberResponseDto]
})
@Get()
findAll(
 @Param('projectId', ParseIntPipe) projectId:number
){

 return this.service.findAll(projectId);
}



@ApiOkResponse({
  type: ProjectMemberResponseDto
})
@Delete(':userId')
remove(
 @Param('projectId', ParseIntPipe) projectId:number,
 @Param('userId', ParseIntPipe) userId:number
){

 return this.service.remove(
   projectId,
   userId
 );

}


}