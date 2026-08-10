import { Module } from '@nestjs/common';
import { ProjectMembersController } from './project-members.controller';
import { ProjectMembersService } from './project-members.service';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  controllers: [ProjectMembersController],
  providers: [ProjectMembersService],
  imports: [
    PermissionsModule,
  ],
})
export class ProjectMembersModule {}
