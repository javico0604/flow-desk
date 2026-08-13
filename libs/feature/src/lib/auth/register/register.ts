import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TranslocoPipe } from '@jsverse/transloco';
import { AuthService } from '@flow-desk/data-access';
import { Router } from '@angular/router';
import { TranslateService } from '@flow-desk/core';
import { I18N_REGISTER } from './i18n/i18n-register';
import { take } from 'rxjs';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'lib-register',
  imports: [
    FormField,
    FormRoot,
    NzInputModule,
    NzButtonModule,
    NzFlexModule,
    TranslocoPipe,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private translateService = inject(TranslateService);

  constructor() {
    this.translateService.setTranslation(
      'register',
      I18N_REGISTER
    )
  }
  public registerModel = signal<RegisterData>({
    name: '',
    email: '',
    password: '',
  });

  public registerForm = form(
    this.registerModel, 
    (schemaPath) => {
      email(schemaPath.email);
      required(schemaPath.email);
      required(schemaPath.name);
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

  async onSubmit(data: RegisterData) {
    return this.authService.register(data).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}