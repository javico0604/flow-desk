import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [
    PermissionsModule,
  ],
})
export class BoardsModule {}
