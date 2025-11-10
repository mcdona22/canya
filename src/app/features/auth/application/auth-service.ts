import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '../data/auth-repository';
import { AppUser } from '../../app-user/data/app-user';
import { AppUserRepository } from '../../app-user/data/app-user-repository';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authRepository = inject(AuthRepository);
  appUserRepository = inject(AppUserRepository);
  authenticated = this.authRepository.authenticated;
  currentUser = this.authRepository.currentUser;

  async signInWithGoogle(): Promise<AppUser | null> {
    const appUser = await this.authRepository.signInWithGoogle();
    await this.appUserRepository.writeDocument(appUser!);
    return appUser;
  }

  signOut(): Promise<void> {
    return this.authRepository.signOut();
  }
}
