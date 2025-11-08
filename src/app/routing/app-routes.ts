import { Routes } from '@angular/router';
import { LandingPage } from '../features/landing-page/landing-page';
import { Gangs } from '../features/gangs/gangs';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    title: 'Canya Home',
  },
  { path: 'gangs', component: Gangs, title: 'Canya Gang' },
];
