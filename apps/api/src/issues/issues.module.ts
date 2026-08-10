import { Module } from '@nestjs/common';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { EventsModule } from '../events/events.module';
import { ActivitiesModule } from '../activities/activities.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  controllers: [IssuesController],
  providers: [IssuesService],
  imports: [EventsModule, ActivitiesModule, NotificationsModule, PermissionsModule]
})
export class IssuesModule {}
