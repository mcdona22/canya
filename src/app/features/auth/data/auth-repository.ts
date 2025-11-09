import { computed, inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppUser } from '../../app-user/data/app-user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private auth = inject(Auth);
  authenticated = computed(() => this.authState() != null);
  private authState$ = authState(this.auth);
  authState = toSignal<User | null>(this.authState$, { initialValue: null });
  currentUser$ = this.authState$.pipe(
    map((user) => {
      if (user == null) return null;
      const { uid, displayName, email, photoURL } = user;
      return { uid, displayName, email, photoURL } as AppUser;
    }),
  );
  currentUser = toSignal<AppUser | null>(this.currentUser$, {
    initialValue: null,
  });

  async signInWithGoogle(): Promise<AppUser | null> {
    console.log('[AUTH REPO] Starting Google Sign-In popup...');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      console.log(`[AUTH REPO] Sign-In Success for user: ${result.user.uid}`);
      console.log(`Firebase User`, result.user);
      const { uid, displayName, email, photoURL } = result.user;
      const appUser = {
        uid,
        displayName,
        email,
        photoURL,
      } as AppUser;
      console.log(`[AUTH REPO] signed in`, appUser);
      return appUser;
    } catch (error) {
      console.error('[AUTH REPO] Google Sign-In Failed:', error);
      throw new Error('Google Sign-In failed.');
    }
  }

  async signOut(): Promise<void> {
    console.log('[AUTH REPO] Signing out user...');
    await signOut(this.auth);
  }
}
