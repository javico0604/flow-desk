import { 
  Injectable, 
  NotFoundException,
  ForbiddenException
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { AddMemberDto } from './dto/add-member.dto';
import { PermissionsService } from '../permissions/permissions.service';


@Injectable()
export class ProjectMembersService {


constructor(
 private prisma: PrismaService,
 private permissions: PermissionsService
) {}



async addMember(
 projectId:number,
 userId:number,
 dto:AddMemberDto
){

 const canManage =
 await this.permissions.canManageProject(
   userId,
   projectId
 );


 if(!canManage){

  throw new ForbiddenException(
    'No tienes permisos para añadir miembros'
  );

 }



 const user =
 await this.prisma.user.findUnique({

  where:{
    id:dto.userId
  }

 });


 if(!user){

  throw new NotFoundException(
    'User not found'
  );

 }



 return this.prisma.projectMember.create({

  data:{

    projectId,

    userId:dto.userId,

    role:'MEMBER'

  }

 });


}





async findAll(
 projectId:number
){

 return this.prisma.projectMember.findMany({

  where:{
    projectId
  },

  include:{

    user:{

      select:{
        id:true,
        name:true,
        email:true
      }

    }

  }

 });

}





async remove(
 projectId:number,
 userId:number,
 memberId:number
){

 const canManage =
 await this.permissions.canManageProject(
   userId,
   projectId
 );


 if(!canManage){

  throw new ForbiddenException(
   'No tienes permisos para eliminar miembros'
  );

 }



 return this.prisma.projectMember.delete({

  where:{

    userId_projectId:{

      userId:memberId,

      projectId

    }

  }

 });

}



}