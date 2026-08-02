import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { EventsModule } from '../events/events.module';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  imports: [EventsModule],
  exports:[
    ActivitiesService
  ]
})
export class ActivitiesModule {}
