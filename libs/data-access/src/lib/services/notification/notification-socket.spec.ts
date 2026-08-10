import { TestBed } from '@angular/core/testing';

import { NotificationsSocketService } from './notification-socket.service';

describe('NotificationSocket', () => {
  let service: NotificationsSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
