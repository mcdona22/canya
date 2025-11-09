import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { LogLevel, setLogLevel } from '@angular/fire';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';

export const firebaseProviders = [
  provideFirebaseApp(() => {
    setLogLevel(LogLevel.VERBOSE);
    console.log(`Initialising Firebase App`);
    return initializeApp(environment.firebase);
  }),
  provideAuth(() => {
    console.log(`Providing Authentication`);
    const auth = getAuth();
    if (environment.useEmulators) {
      console.log(`Using Auth emulator`);
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
    return auth;
  }),

  provideFirestore(() => {
    console.log(`PROVIDERS: providing firestore`);
    const firestore = getFirestore();
    if (environment.useEmulators) {
      console.log(`Using firestore emulator`);
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
    return firestore;
  }),
];
