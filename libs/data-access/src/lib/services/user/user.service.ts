import { inject, Injectable, signal } from '@angular/core';
import { UsersApiService } from '../../api-client/services';
import { User } from '../../models/user';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly currentUser = signal<User | null>(null);
  private userApiService = inject(UsersApiService);

    getMe() {
        return this.userApiService.usersControllerMe().pipe(
          map((data) => new User(data)),
          tap((user) => this.currentUser.set(user))
        );
    }
}
