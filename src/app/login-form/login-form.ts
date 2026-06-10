import { Component, inject, output, signal } from '@angular/core';
import { form, required, email as emailValidator, FormField } from '@angular/forms/signals';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login-form',
  imports: [FormField],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private readonly auth = inject(AuthService);

  loggedIn = output<void>();

  protected readonly model = signal({ email: 'demo@ipssi.fr', password: 'password123' });
  protected readonly f = form(this.model, (path) => {
    required(path.email, { message: "L'email est obligatoire." });
    emailValidator(path.email, { message: 'Email invalide.' });
    required(path.password, { message: 'Le mot de passe est obligatoire.' });
  });

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected onSubmit(): void {
    if (!this.f().valid() || this.loading()) return;
    const { email, password } = this.model();
    this.loading.set(true);
    this.error.set(null);
    this.auth.login(email, password).subscribe({
      next: () => {
        this.loading.set(false);
        this.loggedIn.emit();
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Identifiants invalides.');
      },
    });
  }
}
