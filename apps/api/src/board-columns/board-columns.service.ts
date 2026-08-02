import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardColumnDto } from './dto/create-board-column.dto';
import { UpdateBoardColumnDto } from './dto/update-board-column.dto';
import { MoveColumnDto } from './dto/move-column.dto';


@Injectable()
export class BoardColumnsService {


constructor(
 private prisma: PrismaService
){}



create(
 boardId:number,
 dto:CreateBoardColumnDto
){

 return this.prisma.boardColumn.create({

   data:{
     boardId,
     name:dto.name,
     position:dto.position
   }

 });

}



findAll(
 boardId:number
){

 return this.prisma.boardColumn.findMany({

   where:{
     boardId
   },

   orderBy:{
     position:'asc'
   }

 });

}



async findOne(
 id:number
){

 const column = await this.prisma.boardColumn.findUnique({

   where:{
     id
   }

 });


 if(!column){
   throw new NotFoundException(
     'Column not found'
   );
 }


 return column;

}



update(
 id:number,
 dto:UpdateBoardColumnDto
){

 return this.prisma.boardColumn.update({

   where:{
     id
   },

   data:dto

 });

}

move(
 id:number,
 dto:MoveColumnDto
){

 return this.prisma.boardColumn.update({

  where:{
   id
  },

  data:{
   position:dto.position
  }

 });

}


remove(
 id:number
){

 return this.prisma.boardColumn.delete({

   where:{
     id
   }

 });

}


}