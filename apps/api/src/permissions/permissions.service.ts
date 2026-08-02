import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PermissionsService {


constructor(
 private prisma:PrismaService
){}



async getProjectRole(
 userId:number,
 projectId:number
){

 const member =
 await this.prisma.projectMember.findFirst({

  where:{
    userId,
    projectId
  }

 });


 return member?.role;

}



async canManageProject(
 userId:number,
 projectId:number
){

 const role =
 await this.getProjectRole(
  userId,
  projectId
 );


 return role === 'OWNER'
     || role === 'ADMIN';

}


}