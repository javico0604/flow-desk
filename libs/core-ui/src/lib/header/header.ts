import { Component, inject, OnInit, output, signal } from '@angular/core';
import {
  provideTranslocoScope,
  TranslocoPipe,
} from '@jsverse/transloco';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserService, User, AuthService } from '@flow-desk/data-access';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-header',
  imports: [
    TranslocoPipe,
    NzFlexModule,
    NzIconModule,
    NzButtonModule,
    NzAvatarModule,
    NzPopoverModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: [
    provideTranslocoScope({
      scope: 'header',
      alias: 'header',
    }),
  ],
})
export class Header implements OnInit {
  public toggleSidebar = output<void>();
  public user = signal<User | null>(null);

  private router = inject(Router);

  private userService = inject(UserService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.user = this.userService.currentUser;
  }

  public emitToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  public logout(): void {
    this.authService.logout().subscribe(() => {
      this.userService.currentUser.set(null);
      this.router.navigate(['/login']);
    });
  }

  public showNotifications() {
    
  }
}
