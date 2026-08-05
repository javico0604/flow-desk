import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectMembersModule } from './project-members/project-members.module';
import { BoardsModule } from './boards/boards.module';
import { BoardColumnsModule } from './board-columns/board-columns.module';
import { IssuesModule } from './issues/issues.module';
import { CommentsModule } from './comments/comments.module';
import { ActivitiesModule } from './activities/activities.module';
import { EventsModule } from './events/events.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LabelsModule } from './labels/labels.module';
import { IssueLabelsController } from './issue-labels/issue-labels.controller';
import { IssueLabelsService } from './issue-labels/issue-labels.service';

@Module({
  imports: [
    PrismaModule, 
    AuthModule,
    ConfigModule.forRoot({
     isGlobal:true
   }),
    UsersModule,
    ProjectsModule,
    ProjectMembersModule,
    BoardsModule,
    BoardColumnsModule,
    IssuesModule,
    CommentsModule,
    ActivitiesModule,
    EventsModule,
    NotificationsModule,
    LabelsModule,
  ],
  controllers: [AppController, IssueLabelsController],
  providers: [AppService, IssueLabelsService],
})
export class AppModule {}
