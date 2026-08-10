import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './../../api-client/services/auth-api.service';
import { Register } from '../../models/register';
import { Login } from '../../models/login';
import { catchError, of, switchMap, tap } from 'rxjs';
import { UserService } from '../user/user.service';
import { NotificationsSocketService } from '../notification/notification-socket.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authApiService = inject(AuthApiService);
  private readonly userService = inject(UserService);
  private readonly notificationsSocket = inject(NotificationsSocketService);

  private accessToken: string | null = null;

  init() {
    return this.refresh().pipe(
      tap((data) => {
        this.notificationsSocket.connect(
          data.accessToken
        )
      }),
      switchMap(() => this.userService.getMe()),
      catchError(() => {
        return of(null);
      })
    );
  }

  getAccessToken() {
    return this.accessToken;
  }

  register(body: Register) {
    return this.authApiService.authControllerRegister({ body });
  }

  login(body: Login) {
    return this.authApiService.authControllerLogin({ body }).pipe(
      tap((response) => {
        this.accessToken = response.accessToken;
        this.notificationsSocket.connect(
          response.accessToken
        )
      }),
    );
  }

  refresh() {
    return this.authApiService.authControllerRefresh().pipe(
      tap((response) => {
        this.accessToken = response.accessToken;
      }),
    );
  }

  logout() {
    return this.authApiService.authControllerLogout().pipe(
      tap(() => {
        this.notificationsSocket.disconnect();
      })
    );
  }
}