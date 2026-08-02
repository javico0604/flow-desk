import { Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { IssueLabelsService } from './issue-labels.service';
import { LabelResponseDto } from './dto/label-response.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('issue-labels')
export class IssueLabelsController {

    constructor(private service: IssueLabelsService) {}

    @ApiOkResponse({
    type:[LabelResponseDto]
    })
    @Post('issues/:issueId/labels/:labelId')
addLabel(
 @Param('issueId',ParseIntPipe)
 issueId:number,

 @Param('labelId',ParseIntPipe)
 labelId:number
){

 return this.service.addLabel(
   issueId,
   labelId
 );

}

@ApiOkResponse({
 type:[LabelResponseDto]
})
@Delete('issues/:issueId/labels/:labelId')
removeLabel(
 @Param('issueId',ParseIntPipe)
 issueId:number,

 @Param('labelId',ParseIntPipe)
 labelId:number
){

 return this.service.removeLabel(
   issueId,
   labelId
 );

}
}
