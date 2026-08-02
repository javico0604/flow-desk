import { 
  Injectable, 
  NotFoundException,
  ForbiddenException
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PermissionsService } from '../permissions/permissions.service';


@Injectable()
export class BoardsService {


constructor(
 private prisma: PrismaService,
 private permissions: PermissionsService
) {}



async create(
 projectId:number,
 userId:number,
 dto:CreateBoardDto
){

 const canManage =
 await this.permissions.canManageProject(
   userId,
   projectId
 );


 if(!canManage){

  throw new ForbiddenException(
    'No tienes permisos para crear boards'
  );

 }



 return this.prisma.board.create({

  data:{
    name:dto.name,
    projectId
  }

 });

}




async findAll(
 projectId:number,
 userId:number
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



 return this.prisma.board.findMany({

  where:{
    projectId
  }

 });

}




async findOne(
 id:number,
 userId:number
){

 const board =
 await this.prisma.board.findUnique({

  where:{
    id
  }

 });


 if(!board){

  throw new NotFoundException(
    'Board not found'
  );

 }



 const role =
 await this.permissions.getProjectRole(
   userId,
   board.projectId
 );


 if(!role){

  throw new ForbiddenException(
    'No tienes acceso a este board'
  );

 }



 return board;

}




async update(
 id:number,
 userId:number,
 dto:UpdateBoardDto
){

 const board =
 await this.prisma.board.findUnique({

  where:{
    id
  }

 });


 if(!board){

  throw new NotFoundException(
    'Board not found'
  );

 }



 const canManage =
 await this.permissions.canManageProject(
   userId,
   board.projectId
 );


 if(!canManage){

  throw new ForbiddenException(
    'No tienes permisos para editar el board'
  );

 }



 return this.prisma.board.update({

  where:{
    id
  },

  data:dto

 });

}




async remove(
 id:number,
 userId:number
){

 const board =
 await this.prisma.board.findUnique({

  where:{
    id
  }

 });


 if(!board){

  throw new NotFoundException(
    'Board not found'
  );

 }



 const canManage =
 await this.permissions.canManageProject(
   userId,
   board.projectId
 );


 if(!canManage){

  throw new ForbiddenException(
    'No tienes permisos para borrar el board'
  );

 }



 return this.prisma.board.delete({

  where:{
    id
  }

 });

}


}