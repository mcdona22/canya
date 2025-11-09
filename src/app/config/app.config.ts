import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { routes } from '../routing/app-routes';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { LogLevel, setLogLevel } from '@angular/fire';
import { environment } from '../../environments/environment';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
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
  ],
};
