import { UseGuards, Controller, Post, Body, Get, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateLabelDto } from "./dto/create-label.dto";
import { LabelsService } from "./labels.service";
import { LabelResponseDto } from "./dto/label-response.dto";

@ApiTags('Labels')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('labels')
export class LabelsController {


constructor(
 private service:LabelsService
){}



@ApiOkResponse({
 type:LabelResponseDto
})
@Post()
create(
 @Body()
 dto:CreateLabelDto
){

 return this.service.create(dto);

}



@Get()
findAll(){

 return this.service.findAll();

}



@Delete(':id')
remove(
 @Param('id',ParseIntPipe)
 id:number
){

 return this.service.remove(id);

}

}