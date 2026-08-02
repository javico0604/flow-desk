import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivitiesService } from '../activities/activities.service';
import { ActivityType } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class CommentsService {
  constructor(
    private prisma: PrismaService,
    private activities: ActivitiesService,
    private events:EventsGateway
  ) {}

  async create(
  issueId: number,
  userId: number,
  dto: CreateCommentDto
) {

  const comment = await this.prisma.comment.create({

    data: {
      content: dto.content,
      issueId,
      userId,
    },

    include: {
      user: true,
    },

  });


  await this.activities.create(
    issueId,
    userId,
    ActivityType.COMMENT_CREATED,
    {
      commentId: comment.id,
      content: dto.content,
    }
  );

  const issue = await this.prisma.issue.findUnique({
      where: {
        id: comment.issueId,
      },
      select: {
        projectId: true,
      },
    });

    if (issue) {
      this.events.commentCreated(
        issue.projectId,
        comment,
      );
    }


  return comment;

}

  findAll(issueId: number) {
    return this.prisma.comment.findMany({
      where: {
        issueId,
      },

      include: {
        user: true,
      },

      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
      },
    });
  }

  async update(id: number, userId: number, content: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment || comment.userId !== userId) {
      throw new ForbiddenException();
    }

    const issue = await this.prisma.issue.findUnique({
      where: {
        id: comment.issueId,
      },
      select: {
        projectId: true,
      },
    });

    if (issue) {
      this.events.commentUpdated(
        issue.projectId,
        comment,
      );
    }

    return this.prisma.comment.update({
      where: {
        id,
      },

      data: {
        content,
      },
    });
  }

  async remove(id: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('You cannot delete this comment');
    }

    const issue = await this.prisma.issue.findUnique({
      where: {
        id: comment.issueId,
      },
      select: {
        projectId: true,
      },
    });

    if (issue) {
      this.events.commentDeleted(
        issue.projectId,
        id,
      );
    }

    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
