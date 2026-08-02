import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ActivityType } from '@prisma/client';
import { EventsGateway } from "../events/events.gateway";

@Injectable()
export class ActivitiesService {


constructor(
 private prisma:PrismaService,
 private events:EventsGateway
){}



async create(
  issueId: number,
  userId: number,
  action: ActivityType,
  metadata?: object,
) {

  const activity = await this.prisma.activity.create({
    data: {
      issueId,
      userId,
      action,
      metadata,
    },
  });

  const issue = await this.prisma.issue.findUnique({
    where: {
      id: issueId,
    },
    select: {
      projectId: true,
    },
  });

  if (issue) {
    this.events.activityCreated(
      issue.projectId,
      activity,
    );
  }

  return activity;

}

findOne(id:number){

 return this.prisma.activity.findUnique({
   where:{
     id
   },
   include:{
     user:true,
     issue:true
   }
 });

}


findAll(
 issueId:number,
 page=1,
 limit=20
){

 return this.prisma.activity.findMany({

  where:{
   issueId
  },

  include:{
   user:true
  },

  orderBy:{
   createdAt:'desc'
  },

  skip:(page-1)*limit,

  take:limit

 });

}

}