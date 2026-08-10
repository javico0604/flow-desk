import { Component, signal } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { RouterModule } from '@angular/router';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'lib-router-outlet',
  imports: [
    RouterModule,
    Sidebar,
    Header,
    NzFlexModule,
  ],
  templateUrl: './router-outlet.html',
  styleUrl: './router-outlet.scss',
})
export class RouterOutletComponent {
  public showSidebar = signal<boolean>(true);
  
  public toggleSidebar(): void {
    this.showSidebar.update((value) => !value);
  }
}
