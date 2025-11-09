import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '../data/auth-repository';
import { AppUser } from '../data/app-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authRepository = inject(AuthRepository);
  authenticated = this.authRepository.authenticated;
  currentUser = this.authRepository.currentUser;

  signInWithGoogle(): Promise<AppUser | null> {
    return this.authRepository.signInWithGoogle();
  }

  signOut(): Promise<void> {
    return this.authRepository.signOut();
  }
}
