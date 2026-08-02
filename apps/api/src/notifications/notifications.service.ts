import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';


@Injectable()
export class NotificationsService {


constructor(
 private prisma:PrismaService,
 private events:EventsGateway
){}



async create(
 userId:number,
 message:string
){


 const notification =
 await this.prisma.notification.create({

  data:{
    userId,
    message
  }

 });



 this.events.notificationCreated(
   userId,
   notification
 );



 return notification;

}




findAll(userId:number){

 return this.prisma.notification.findMany({

  where:{
    userId
  },

  orderBy:{
    createdAt:'desc'
  }

 });

}




read(
 id:number
){

 return this.prisma.notification.update({

  where:{
    id
  },

  data:{
    read:true
  }

 });


}




remove(id:number){

 return this.prisma.notification.delete({

  where:{
    id
  }

 });

}


}