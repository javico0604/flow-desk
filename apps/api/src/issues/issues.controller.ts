import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthUser } from '../auth/types/auth-user';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { MoveIssueDto } from './dto/move-issue.dto';
import { AssignIssueDto } from './dto/assign-issue.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IssueResponseDto } from './dto/issue-response.dto';
import { LabelResponseDto } from '../labels/dto/label-response.dto';
import { FilterIssueDto } from './dto/filter-issue.dto';

@ApiBearerAuth()
@ApiTags('Issues')
@Controller()
export class IssuesController {
  constructor(private issuesService: IssuesService) {}

  @Post('columns/:columnId/issues')
  create(
    @Param('columnId', ParseIntPipe) columnId: number,
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateIssueDto,
  ) {
    return this.issuesService.create(columnId, user.id, dto);
  }

  @ApiOkResponse({
    type: [IssueResponseDto],
  })
  @Get('columns/:columnId/issues')
  findAll(@Param('columnId', ParseIntPipe) columnId: number,  @CurrentUser()
     user: AuthUser,) {
    return this.issuesService.findAll(columnId, user.id);
  }

  @ApiOkResponse({
    type: IssueResponseDto,
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return this.issuesService.findOne(id, user.id);
  }

  @ApiOkResponse({
    type: [IssueResponseDto],
  })
  @Put('issues/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateIssueDto, @CurrentUser() user: AuthUser) {
    return this.issuesService.update(id, user.id, dto);
  }

  @ApiOkResponse({
    type: [IssueResponseDto],
  })
  @Delete('issues/:id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return this.issuesService.remove(id, user.id);
  }

  @ApiOkResponse({
    type: [IssueResponseDto],
  })
  @Patch('issues/:id/move')
  move(@Param('id', ParseIntPipe) id: number, @Body() dto: MoveIssueDto, @CurrentUser() user: AuthUser) {
    return this.issuesService.move(id, user.id, dto);
  }

  @ApiOkResponse({
    type: [IssueResponseDto],
  })
  @Patch('issues/:id/assign')
  assign(@Param('id', ParseIntPipe) id: number, @Body() dto: AssignIssueDto, @CurrentUser() user: AuthUser) {
    return this.issuesService.assign(id, user.id, dto);
  }

  @ApiOkResponse({
    type: [IssueResponseDto],
  })
  @Patch('issues/:id/priority')
  updatePriority(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePriorityDto,
    @CurrentUser() user: AuthUser
  ) {
    return this.issuesService.updatePriority(id, user.id, dto);
  }

  @ApiOkResponse({
  type: [LabelResponseDto],
})
@Get(':id/labels')
findLabels(
  @Param('id', ParseIntPipe)
  id: number,
) {

  return this.issuesService.findLabels(id);

}

@ApiOkResponse({
  type: [IssueResponseDto],
})
@Get()
findAllFiltered(
  @Query() filters: FilterIssueDto
){

  return this.issuesService.search(filters);

}
}
