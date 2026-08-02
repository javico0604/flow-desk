import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthUser } from '../auth/types/auth-user';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class CommentsController {
  constructor(private service: CommentsService) {}

  @ApiOkResponse({
    type: CommentResponseDto,
  })
  @Post('issues/:issueId/comments')
  create(
    @Param('issueId', ParseIntPipe)
    issueId: number,

    @CurrentUser()
    user: { id: number },

    @Body()
    dto: CreateCommentDto,
  ) {
    return this.service.create(issueId, user.id, dto);
  }

  @ApiOkResponse({
    type: [CommentResponseDto],
  })
  @Get('issues/:issueId/comments')
  findAll(
    @Param('issueId', ParseIntPipe)
    issueId: number,
  ) {
    return this.service.findAll(issueId);
  }

  @ApiOkResponse({
    type: CommentResponseDto,
  })
  @Get('comments/:id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findOne(id);
  }

  @ApiOkResponse({
    type: CommentResponseDto,
  })
  @Put('comments/:id')
  update(
    @CurrentUser()
    user: AuthUser,

    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateCommentDto,
  ) {
    return this.service.update(id, user.id, dto.content);
  }

  @ApiOkResponse({
    type: CommentResponseDto,
  })
  @Delete('comments/:id')
  remove(
    @CurrentUser()
    user: AuthUser,

    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.remove(id, user.id);
  }
}
