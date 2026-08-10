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
  providers: [
    provideTranslocoScope({
      scope: 'auth',
      alias: 'auth',
    }),
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
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
    return this.authService.register(data).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}