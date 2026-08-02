import {
 Controller,
 Get,
 Patch,
 Delete,
 Param,
 ParseIntPipe,
 UseGuards
} from '@nestjs/common';

import {
 ApiBearerAuth,
 ApiOkResponse,
 ApiTags
} from '@nestjs/swagger';


import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { NotificationsService } from './notifications.service';
import { NotificationResponseDto } from './dto/notification-response.dto';



@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {


constructor(
 private service:NotificationsService
){}



@ApiOkResponse({
 type:[NotificationResponseDto]
})
@Get()
findAll(
 @CurrentUser()
 user:{id:number}
){

 return this.service.findAll(
   user.id
 );

}




@ApiOkResponse({
 type:NotificationResponseDto
})
@Patch(':id/read')
read(
 @Param('id',ParseIntPipe)
 id:number
){

 return this.service.read(id);

}




@ApiOkResponse({
 type:NotificationResponseDto
})
@Delete(':id')
remove(
 @Param('id',ParseIntPipe)
 id:number
){

 return this.service.remove(id);

}


}