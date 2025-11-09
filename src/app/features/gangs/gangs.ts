import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../auth/application/auth-service';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-gangs',
  imports: [MatButton, JsonPipe],
  templateUrl: './gangs.html',
  styleUrl: './gangs.scss',
})
export class Gangs {
  authService = inject(AuthService);
  isAuthenticated = this.authService.authenticated;
  currentUser = this.authService.currentUser;

  constructor() {
    effect(() => console.log(`Auth state has changed`, this.isAuthenticated()));
    effect(() => console.log(`User changed`, this.currentUser()));
  }

  toggleAuthenticated() {
    this.isAuthenticated()
      ? this.authService
          .signOut()
          .then(() => console.log(`Signed out successfully`))
      : this.authService
          .signInWithGoogle()
          .then(() => console.log(`Signed in with google`));
  }
}
