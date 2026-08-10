import { NotificationResponseDto } from "../api-client/models";

export class Notification {
  id: number;
  message: string;
  createdAt: string;
  read: boolean;

  constructor(dto: NotificationResponseDto) {
    this.id = dto.id;
    this.message = dto.message;
    this.createdAt = dto.createdAt;
    this.read = dto.read;
  }
}