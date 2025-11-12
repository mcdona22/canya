import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { routes } from '../routing/app-routes';
import { provideRouter } from '@angular/router';
import { firebaseProviders } from './firebase-providers';
import { AuthRepository } from '../features/auth/data/auth-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ...firebaseProviders,
    provideAppInitializer(() => {
      inject(AuthRepository);
    }),
  ],
};
