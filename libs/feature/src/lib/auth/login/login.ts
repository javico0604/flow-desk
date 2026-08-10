import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import {
  provideTranslocoScope,
  TranslocoPipe,
} from '@jsverse/transloco';
import { AuthService } from '@flow-desk/data-access';
import { Router } from '@angular/router';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'lib-login',
  imports: [
    FormField,
    FormRoot,
    NzInputModule,
    NzButtonModule,
    NzFlexModule,
    TranslocoPipe,
  ],
  providers: [
    provideTranslocoScope({
      scope: 'auth',
      alias: 'auth',
    }),
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  public loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  public loginForm = form(
    this.loginModel, 
    (schemaPath) => {
      email(schemaPath.email);
      required(schemaPath.email);
      required(schemaPath.password);
    },
    {
      submission: {
        action: async (field) => {
          await this.onSubmit(field().value());
        },
        onInvalid: (field) => {
          const firstError = field().errorSummary()[0];
          firstError?.fieldTree().focusBoundControl();
        },
      },
    }
  );

  private authService = inject(AuthService);
  private router = inject(Router);

  async onSubmit(data: LoginData) {
    return this.authService.login(data).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }
}