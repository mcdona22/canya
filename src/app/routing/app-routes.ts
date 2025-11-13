import { Routes } from '@angular/router';
import { LandingPage } from '../features/landing-page/landing-page';
import { Gangs } from '../features/gangs/gangs';
import { CanyaLanding } from '../features/canya/presentation/canya-landing/canya-landing';
import { CanyaForm } from '../features/canya/presentation/canya-form/canya-form';

export const canyasBasePath = 'canya';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    title: 'Canya Home',
  },
  { path: 'gangs', component: Gangs, title: 'Gangs' },
  {
    path: canyasBasePath,
    children: [
      { path: '', title: 'All Canyas', component: CanyaLanding },
      { path: `new`, component: CanyaForm, title: 'New Canya' },
    ],
  },
];
