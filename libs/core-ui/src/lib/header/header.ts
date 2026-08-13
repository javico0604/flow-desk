import { Component, inject, OnInit, output, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserService, User, AuthService } from '@flow-desk/data-access';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { Router } from '@angular/router';
import { TranslateService } from '@flow-desk/core';
import { I18N_HEADER } from './i18n/i18n-header';
import { take } from 'rxjs';

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
})
export class Header implements OnInit {
  public toggleSidebar = output<void>();
  public user = signal<User | null>(null);

  private router = inject(Router);

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private translateService = inject(TranslateService);

  constructor() {
    this.translateService.setTranslation(
      'header',
      I18N_HEADER
    )
  }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
  }

  public emitToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  public logout(): void {
    this.authService.logout().pipe(take(1)).subscribe(() => {
      this.userService.currentUser.set(null);
      this.router.navigate(['/login']);
    });
  }

  public showNotifications() {
    // TODO add notification  
  }
}
