import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { MoveIssueDto } from './dto/move-issue.dto';
import { AssignIssueDto } from './dto/assign-issue.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { FilterIssueDto } from './dto/filter-issue.dto';

import { ActivitiesService } from '../activities/activities.service';
import { ActivityType } from '@prisma/client';

import { EventsGateway } from '../events/events.gateway';
import { NotificationsService } from '../notifications/notifications.service';
import { PermissionsService } from '../permissions/permissions.service';


@Injectable()
export class IssuesService {


constructor(
  private prisma: PrismaService,
  private activities: ActivitiesService,
  private events: EventsGateway,
  private notifications: NotificationsService,
  private permissions: PermissionsService,
) {}



private async checkAccess(
  userId:number,
  projectId:number
){

 const role =
 await this.permissions.getProjectRole(
   userId,
   projectId
 );


 if(!role){

  throw new ForbiddenException(
    'No perteneces al proyecto'
  );

 }


 return role;

}




async create(
 columnId:number,
 creatorId:number,
 dto:CreateIssueDto
){

 const column =
 await this.prisma.boardColumn.findUnique({

  where:{
    id:columnId
  },

  include:{
    board:true
  }

 });


 if(!column){
  throw new NotFoundException();
 }


 await this.checkAccess(
  creatorId,
  column.board.projectId
 );



 const issue =
 await this.prisma.issue.create({

  data:{

    title:dto.title,

    description:dto.description,

    priority:dto.priority,

    position:dto.position,

    creatorId,

    assigneeId:dto.assigneeId,

    columnId,

    boardId:column.boardId,

    projectId:column.board.projectId

  }

 });



 if(dto.assigneeId){

  await this.notifications.create(
    dto.assigneeId,
    `Te han asignado la issue ${issue.id}`
  );


  await this.activities.create(
    issue.id,
    creatorId,
    ActivityType.ISSUE_ASSIGNED
  );

 }



 await this.activities.create(
  issue.id,
  creatorId,
  ActivityType.ISSUE_CREATED
 );


 this.events.issueCreated(
  issue.projectId,
  issue
 );


 return issue;

}




async findAll(
 columnId:number,
 userId:number
){


 const column =
 await this.prisma.boardColumn.findUnique({

  where:{
    id:columnId
  },

  include:{
    board:true
  }

 });


 if(!column){
  throw new NotFoundException();
 }


 await this.checkAccess(
  userId,
  column.board.projectId
 );


 return this.prisma.issue.findMany({

  where:{
    columnId
  },


  include:{
    assignee:true,
    creator:true
  },


  orderBy:{
    position:'asc'
  }

 });

}





async findOne(
 id:number,
 userId:number
){


 const issue =
 await this.prisma.issue.findUnique({

  where:{
    id
  }

 });


 if(!issue){
  throw new NotFoundException();
 }



 await this.checkAccess(
  userId,
  issue.projectId
 );



 return this.prisma.issue.findUnique({

  where:{
    id
  },

  include:{
    creator:true,
    assignee:true,
    labels:true
  }

 });

}





async update(
 id:number,
 userId:number,
 dto:UpdateIssueDto
){


 const oldIssue =
 await this.prisma.issue.findUnique({

  where:{
    id
  },

  select:{
    assigneeId:true,
    projectId:true
  }

 });


 if(!oldIssue){
  throw new NotFoundException();
 }



 await this.checkAccess(
  userId,
  oldIssue.projectId
 );



 const issue =
 await this.prisma.issue.update({

  where:{
    id
  },

  data:dto

 });



 await this.activities.create(
  issue.id,
  userId,
  ActivityType.ISSUE_UPDATED
 );



 if(
  dto.assigneeId &&
  dto.assigneeId !== oldIssue.assigneeId
 ){

  await this.notifications.create(
    dto.assigneeId,
    `Te han asignado la issue ${issue.id}`
  );


  await this.activities.create(
    issue.id,
    userId,
    ActivityType.ISSUE_ASSIGNED
  );

 }



 this.events.issueUpdated(
  issue.projectId,
  issue
 );


 return issue;

}





async remove(
 id:number,
 userId:number
){


 const issue =
 await this.prisma.issue.findUnique({

  where:{
    id
  }

 });


 if(!issue){
  throw new NotFoundException();
 }



 const role =
 await this.permissions.getProjectRole(
  userId,
  issue.projectId
 );


 if(
  role !== 'OWNER' &&
  role !== 'ADMIN'
 ){

  throw new ForbiddenException(
    'No puedes borrar esta issue'
  );

 }



 await this.activities.create(
  issue.id,
  userId,
  ActivityType.ISSUE_DELETED
 );



 const deleted =
 await this.prisma.issue.delete({

  where:{
    id
  }

 });



 this.events.issueDeleted(
  deleted.projectId,
  id
 );


 return deleted;

}





async move(
 id:number,
 userId:number,
 dto:MoveIssueDto
){


 const issue =
 await this.prisma.issue.findUnique({

  where:{
    id
  }

 });


 if(!issue){
  throw new NotFoundException();
 }


 await this.checkAccess(
  userId,
  issue.projectId
 );



 const updated =
 await this.prisma.issue.update({

  where:{
    id
  },

  data:{
    columnId:dto.columnId,
    position:dto.position
  }

 });



 await this.activities.create(
  updated.id,
  userId,
  ActivityType.ISSUE_MOVED
 );


 this.events.issueMoved(
  updated.projectId,
  updated
 );


 return updated;

}





async assign(
 id:number,
 userId:number,
 dto:AssignIssueDto
){


 const issue =
 await this.prisma.issue.findUnique({

  where:{
    id
  }

 });


 if(!issue){
  throw new NotFoundException();
 }


 const role =
 await this.permissions.getProjectRole(
  userId,
  issue.projectId
 );


 if(
  role !== 'OWNER' &&
  role !== 'ADMIN'
 ){

  throw new ForbiddenException();

 }



 const updated =
 await this.prisma.issue.update({

  where:{
    id
  },

  data:{
    assigneeId:dto.assigneeId
  }

 });



 await this.notifications.create(
  dto.assigneeId,
  `Te han asignado la issue ${updated.id}`
 );



 return updated;

}





async updatePriority(
 id:number,
 userId:number,
 dto:UpdatePriorityDto
){


 const issue =
 await this.prisma.issue.findUnique({

  where:{
    id
  }

 });


 if(!issue){
  throw new NotFoundException();
 }


 await this.checkAccess(
  userId,
  issue.projectId
 );



 const updated =
 await this.prisma.issue.update({

  where:{
    id
  },

  data:{
    priority:dto.priority
  }

 });



 await this.activities.create(
  updated.id,
  userId,
  ActivityType.ISSUE_UPDATED,
  {
    priority:dto.priority
  }
 );


 this.events.issueUpdated(
  updated.projectId,
  updated
 );


 return updated;

}





async findLabels(
 issueId:number
){


 const issue =
 await this.prisma.issue.findUnique({

  where:{
    id:issueId
  },

  select:{
    labels:true
  }

 });


 if(!issue){
  throw new NotFoundException();
 }


 return issue.labels;

}





async search(
 filters:FilterIssueDto
){


 return this.prisma.issue.findMany({

  where:{

    title:{
      contains:filters.search
    },


    projectId:filters.projectId,


    assigneeId:filters.assigneeId,


    priority:filters.priority,


    labels:filters.labelId
      ? {
          some:{
            id:filters.labelId
          }
        }
      : undefined

  },


  include:{
    assignee:true,
    creator:true,
    labels:true
  }

 });

}


}