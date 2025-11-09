import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../auth/application/auth-service';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { AppUser } from '../app-user/data/app-user';
import { AppUserRepository } from '../app-user/data/app-user-repository';

@Component({
  selector: 'app-gangs',
  imports: [MatButton, JsonPipe],
  templateUrl: './gangs.html',
  styleUrl: './gangs.scss',
})
export class Gangs {
  authService = inject(AuthService);
  repository = inject(AppUserRepository);
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
          .then((user) => console.log(`Signed in with google`, user));
  }

  async writeAppUser() {
    const appUser: AppUser = {
      id: this.randomKey(),
      email: 'mcdona22@gmail.com',
      displayName: 'John Mac',
      photoURL: 'some url',
    };
    console.log(`About to write document`, appUser);
    await this.repository.writeDocument(appUser);
    console.log(`Appears to have been written`);
  }

  private randomKey = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
