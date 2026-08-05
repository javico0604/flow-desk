import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  imports: [RouterModule, NzIconModule, TranslocoPipe],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'flow-desk';
}
