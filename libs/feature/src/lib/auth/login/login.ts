import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TranslocoPipe } from '@jsverse/transloco';
import { AuthService } from '@flow-desk/data-access';
import { Router } from '@angular/router';
import { TranslateService } from '@flow-desk/core';
import { I18N_LOGIN } from './i18n/i18n-login';
import { take } from 'rxjs';

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
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private translateService = inject(TranslateService);

  constructor() {
    this.translateService.setTranslation(
      'login',
      I18N_LOGIN
    )
  }
  
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
    return this.authService.login(data).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }
}