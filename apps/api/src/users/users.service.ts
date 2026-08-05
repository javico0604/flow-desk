import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService
  ) {}


  async findOne(id:number){

    return this.prisma.user.findUnique({
      where:{
        id
      },
        select:{
          id:true,
          name:true,
          email:true
        }
    });

  }


  async update(
    id:number,
    data:UpdateUserDto
  ){

    return this.prisma.user.update({
      where:{
        id
      },
      data,
      select:{
        id:true,
        name:true,
        email:true
      }
    });

  }

  async delete(id: number) {

  return this.prisma.user.delete({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });

}

async search(email:string){

 return this.prisma.user.findMany({

  where:{
    email:{
      contains:email
    }
  },

  select:{
    id:true,
    name:true,
    email:true
  }

 });

}

}