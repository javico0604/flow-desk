import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IssueLabelsService {
     constructor(private prisma: PrismaService){}
    async addLabel(
 issueId:number,
 labelId:number
){

 return this.prisma.issue.update({

  where:{
    id:issueId
  },

  data:{
    labels:{
      connect:{
        id:labelId
      }
    }
  },

  include:{
    labels:true
  }

 });

}

async removeLabel(
 issueId:number,
 labelId:number
){

 return this.prisma.issue.update({

  where:{
    id:issueId
  },

  data:{
    labels:{
      disconnect:{
        id:labelId
      }
    }
  },

  include:{
    labels:true
  }

 });

}
}
