import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin:'http://localhost:4200',
    credentials:true
  },
})
export class EventsGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('joinProject')
  joinProject(
    @MessageBody() projectId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`project-${projectId}`);
  }

  @SubscribeMessage('leaveProject')
  leaveProject(
    @MessageBody() projectId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`project-${projectId}`);
  }

  @SubscribeMessage('joinUser')
joinUser(
 @MessageBody() userId:number,
 @ConnectedSocket() client:Socket
){

 client.join(
   `user-${userId}`
 );

}

  issueCreated(projectId: number, issue: any) {
    this.server
      .to(`project-${projectId}`)
      .emit('issue.created', issue);
  }

  issueUpdated(projectId: number, issue: any) {
    this.server
      .to(`project-${projectId}`)
      .emit('issue.updated', issue);
  }

  issueDeleted(projectId: number, id: number) {
    this.server
      .to(`project-${projectId}`)
      .emit('issue.deleted', {
        id,
      });
  }

  issueMoved(projectId: number, issue: any) {
    this.server
      .to(`project-${projectId}`)
      .emit('issue.moved', issue);
  }

  commentCreated(projectId: number, comment: any) {
    this.server
      .to(`project-${projectId}`)
      .emit('comment.created', comment);
  }

  commentUpdated(projectId: number, comment: any) {
    this.server
      .to(`project-${projectId}`)
      .emit('comment.updated', comment);
  }

  commentDeleted(projectId: number, id: number) {
    this.server
      .to(`project-${projectId}`)
      .emit('comment.deleted', {
        id,
      });
  }

  activityCreated(projectId: number, activity: any) {
    this.server
      .to(`project-${projectId}`)
      .emit('activity.created', activity);
  }

  notificationCreated(
 userId:number,
 notification:any
){

 this.server
 .to(`user-${userId}`)
 .emit(
   'notification.created',
   notification
 );

}
}