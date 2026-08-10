import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardResponseDto } from './dto/board-response.dto';
import { AuthUser } from '../auth/types/auth-user';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Boards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @ApiBody({
    type: CreateBoardDto,
  })
  @ApiOkResponse({
    type: BoardResponseDto,
  })
  @Post('projects/:projectId/boards')
  create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateBoardDto,
     @CurrentUser()
     user: AuthUser,
  ) {
    return this.boardsService.create(projectId, user.id, dto);
  }

  @ApiOkResponse({
    type: [BoardResponseDto],
  })
  @Get('projects/:projectId/boards')
  findAll(@Param('projectId', ParseIntPipe) projectId: number, @CurrentUser() user: AuthUser) {
    return this.boardsService.findAll(projectId, user.id);
  }

  @ApiOkResponse({
    type: BoardResponseDto,
  })
  @Get('boards/:id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return this.boardsService.findOne(id, user.id);
  }

  @ApiBody({
    type: UpdateBoardDto,
  })
  @ApiOkResponse({
    type: BoardResponseDto,
  })
  @Put('boards/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBoardDto, @CurrentUser() user: AuthUser) {
    return this.boardsService.update(id, user.id, dto);
  }

  @ApiOkResponse({
    type: BoardResponseDto,
  })
  @Delete('boards/:id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return this.boardsService.remove(id, user.id);
  }
}
