import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';

import { routes } from '../routing/app-routes';
import { provideRouter } from '@angular/router';
import { firebaseProviders } from './firebase-providers';
import { AuthRepository } from '../features/auth/data/auth-repository';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideLuxonDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

    ...firebaseProviders,
    provideAppInitializer(() => {
      inject(AuthRepository);
    }),
  ],
};
