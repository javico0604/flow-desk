import { inject, Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Notification } from '../../models/notification';
import { API_URL } from '../../config/api-url.token';

@Injectable({
  providedIn: 'root',
})
export class NotificationsSocketService {
  private readonly apiUrl = inject(API_URL);
  private socket: Socket | null = null;

  private readonly notifications = signal<Notification[]>([]);
  private readonly unreadCount = signal(0);

  public readonly notificationList =
    this.notifications.asReadonly();

  public readonly unreadNotifications =
    this.unreadCount.asReadonly();

  connect(accessToken: string): void {
    // Evitamos crear varias conexiones
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(this.apiUrl, {
      auth: {
        token: accessToken,
      },
    });

    this.socket.on('connect', () => {
      console.log('WebSocket conectado:', this.socket?.id);
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket desconectado');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Error WebSocket:', error);
    });

    this.socket.on(
      'notification',
      (notification: Notification) => {
        this.notifications.update((notifications) => [
          notification,
          ...notifications,
        ]);

        this.unreadCount.update((count) => count + 1);
      },
    );
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  markAllAsRead(): void {
    this.unreadCount.set(0);

    this.notifications.update((notifications) =>
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  }

  markAsRead(id: number): void {
    this.notifications.update((notifications) =>
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    );

    this.unreadCount.update((count) =>
      Math.max(0, count - 1),
    );
  }

  clear(): void {
    this.notifications.set([]);
    this.unreadCount.set(0);
  }
}