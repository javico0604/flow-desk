import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    PermissionsModule,
  ],
})
export class ProjectsModule {}
