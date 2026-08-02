import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLabelDto } from "./dto/create-label.dto";

@Injectable()
export class LabelsService {


constructor(
 private prisma:PrismaService
){}



create(dto:CreateLabelDto){

 return this.prisma.label.create({

  data:{
    name:dto.name
  }

 });

}



findAll(){

 return this.prisma.label.findMany();

}



remove(id:number){

 return this.prisma.label.delete({

  where:{
    id
  }

 });

}


}