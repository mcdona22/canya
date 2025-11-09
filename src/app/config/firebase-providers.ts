import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../../environments/environment';

export const firebaseProviders = [
  provideAuth(() => {
    console.log(`Providing Authentication`);
    const auth = getAuth();
    if (environment.useEmulators) {
      console.log(`Using Auth emulator`);
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
    return auth;
  }),
];
