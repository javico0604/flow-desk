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
 Patch
} from '@nestjs/common';

import {
 ApiBearerAuth,
 ApiBody,
 ApiOkResponse,
 ApiTags
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BoardColumnsService } from './board-columns.service';

import { CreateBoardColumnDto } from './dto/create-board-column.dto';
import { UpdateBoardColumnDto } from './dto/update-board-column.dto';
import { BoardColumnResponseDto } from './dto/board-column-response.dto';
import { MoveColumnDto } from './dto/move-column.dto';


@ApiTags('Board Columns')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class BoardColumnsController {


constructor(
 private service:BoardColumnsService
){}



@ApiBody({
 type:CreateBoardColumnDto
})
@ApiOkResponse({
 type:BoardColumnResponseDto
})
@Post('boards/:boardId/columns')
create(
 @Param('boardId', ParseIntPipe) boardId:number,
 @Body() dto:CreateBoardColumnDto
){

 return this.service.create(
   boardId,
   dto
 );

}




@ApiOkResponse({
 type:[BoardColumnResponseDto]
})
@Get('boards/:boardId/columns')
findAll(
 @Param('boardId', ParseIntPipe) boardId:number
){

 return this.service.findAll(
   boardId
 );

}




@ApiOkResponse({
 type:BoardColumnResponseDto
})
@Get('columns/:id')
findOne(
 @Param('id', ParseIntPipe) id:number
){

 return this.service.findOne(id);

}




@ApiBody({
 type:UpdateBoardColumnDto
})
@ApiOkResponse({
 type:BoardColumnResponseDto
})
@Put('columns/:id')
update(
 @Param('id', ParseIntPipe) id:number,
 @Body() dto:UpdateBoardColumnDto
){

 return this.service.update(
   id,
   dto
 );

}

@ApiBody({
  type: MoveColumnDto
})
@ApiOkResponse({
  type: BoardColumnResponseDto
})
@Patch('columns/:id/position')
move(
  @Param('id', ParseIntPipe) id:number,
  @Body() dto:MoveColumnDto
){

  return this.service.move(
    id,
    dto
  );

}


@ApiOkResponse({
 type:BoardColumnResponseDto
})
@Delete('columns/:id')
remove(
 @Param('id', ParseIntPipe) id:number
){

 return this.service.remove(id);

}


}