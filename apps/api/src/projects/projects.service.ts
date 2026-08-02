import { 
  Injectable, 
  ForbiddenException,
  NotFoundException
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { PermissionsService } from '../permissions/permissions.service';


@Injectable()
export class ProjectsService {


constructor(
 private prisma: PrismaService,
 private permissions: PermissionsService
){}



create(
 userId:number,
 dto:CreateProjectDto
){

 return this.prisma.project.create({

   data:{
     name:dto.name,
     description:dto.description,
     ownerId:userId
   }

 });

}



async findAll(userId:number){

 return this.prisma.project.findMany({

   where:{
     OR:[
       {
        ownerId:userId
       },
       {
        members:{
          some:{
            userId
          }
        }
       }
     ]
   }

 });

}



async findOne(
 id:number,
 userId:number
){

 const allowed =
 await this.permissions.getProjectRole(
   userId,
   id
 );


 if(!allowed){
   throw new ForbiddenException(
     'No tienes acceso a este proyecto'
   );
 }


 const project =
 await this.prisma.project.findUnique({

   where:{
     id
   }

 });


 if(!project){
   throw new NotFoundException();
 }


 return project;

}



async update(
 id:number,
 userId:number,
 data:any
){

 const canManage =
 await this.permissions.canManageProject(
   userId,
   id
 );


 if(!canManage){

   throw new ForbiddenException(
    'No tienes permisos para editar este proyecto'
   );

 }


 return this.prisma.project.update({

   where:{
     id
   },

   data

 });

}



async remove(
 id:number,
 userId:number
){

 const role =
 await this.permissions.getProjectRole(
   userId,
   id
 );


 if(role !== 'OWNER'){

   throw new ForbiddenException(
     'Solo el propietario puede borrar el proyecto'
   );

 }


 return this.prisma.project.delete({

   where:{
     id
   }

 });

}


}