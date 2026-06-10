import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from '../../login-form/login-form';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly router = inject(Router);

  /** Renseigné par le guard via ?returnUrl=… */
  returnUrl = input<string>();

  protected onLoggedIn(): void {
    this.router.navigateByUrl(this.returnUrl() ?? '/tracks');
  }
}
