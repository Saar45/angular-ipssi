import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';
import { NotificationService } from './services/notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly auth = inject(AuthService);
  protected readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);

  protected logout(): void {
    this.auth.logout();
    this.router.navigate(['/tracks']);
  }
}
