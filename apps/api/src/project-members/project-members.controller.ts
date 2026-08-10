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
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthUser } from '../auth/types/auth-user';


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
 @CurrentUser()
     user: AuthUser,
 @Body() dto:AddMemberDto
){

 return this.service.addMember(
   projectId,
   user.id,
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
   @CurrentUser()
     user: AuthUser,
 @Param('projectId', ParseIntPipe) projectId:number,
 @Param('userId', ParseIntPipe) userId:number
){

 return this.service.remove(
   projectId,
   user.id,
   userId
 );

}


}