import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { EventsModule } from '../events/events.module';
import { ActivitiesModule } from '../activities/activities.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [EventsModule, ActivitiesModule]
})
export class CommentsModule {}
