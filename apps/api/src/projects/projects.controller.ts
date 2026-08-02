import {
 Controller,
 Get,
 Post,
 Body,
 Param,
 UseGuards
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthUser } from '../auth/types/auth-user';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ProjectResponseDto } from './dto/project-response.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {


constructor(
 private projectsService:ProjectsService
){}



@Post()
create(
 @CurrentUser() user:AuthUser,
 @Body() dto:CreateProjectDto
){

 return this.projectsService.create(
   user.id,
   dto
 );

}



@ApiBearerAuth()
@ApiOkResponse({
  type: [ProjectResponseDto]
})
@Get()
findAll(
  @CurrentUser() user: AuthUser
){

  return this.projectsService.findAll(
    user.id
  );

}



@ApiBearerAuth()
@ApiOkResponse({
  type: ProjectResponseDto
})
@Get(':id')
findOne(
  @CurrentUser() user: AuthUser,
  @Param('id') id:number
){

  return this.projectsService.findOne(
    id,
    user.id
  );

}


}