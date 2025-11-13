import { Component, inject } from '@angular/core';
import { AuthService } from '../../application/auth-service';
import { MatButtonModule } from '@angular/material/button';
import { CoolGoogleButtonComponent } from '@angular-cool/social-login-buttons';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-auth-button',
  imports: [
    MatButtonModule,
    MatTooltipModule,
    CoolGoogleButtonComponent,
    MatIconModule,
  ],
  templateUrl: './auth-button.html',
  styleUrl: './auth-button.scss',
  host: {
    '[class.is-ready]': '!isLoading()',
  },
})
export class AuthButton {
  authService = inject(AuthService);
  isAuthenticated = this.authService.authenticated;
  isLoading = this.authService.authServiceLoading;

  async onGoogleLoginClicked() {
    await this.authService.signInWithGoogle();
  }

  async onSignOutClicked() {
    await this.authService.signOut();
  }
}
