import { Routes } from '@angular/router';
import { LandingPage } from '../features/landing-page/landing-page';
import { Gangs } from '../features/gangs/gangs';
import { CanyaLanding } from '../features/canya/presentation/canya-landing/canya-landing';
import { CanyaForm } from '../features/canya/presentation/canya-form/canya-form';
import { CanyaDetail } from '../features/canya/presentation/canya-detail/canya-detail';
import { GangDetail } from '../features/gangs/gang-detail/gang-detail';
import { detailResolver } from '../features/gangs/detail-resolver';
import { CanyaDetailStore } from '../features/gangs/canya-detail-store';

export const canyasBasePath = 'canya';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    title: 'Canya Home',
  },
  {
    path: 'gangs',
    children: [
      { path: '', component: Gangs, title: 'Gangs' },
      {
        path: ':id',
        providers: [CanyaDetailStore],
        resolve: [detailResolver],
        children: [
          { path: '', component: GangDetail, title: 'With ID' },
          { path: 'edit', component: GangDetail, title: 'Editing' },
        ],
      },
    ],
  },
  {
    path: canyasBasePath,
    children: [
      { path: '', title: 'All Canyas', component: CanyaLanding },
      { path: `new`, component: CanyaForm, title: 'New Canya' },
      {
        path: `:id`,
        component: CanyaDetail,
        title: 'Canya Detail',
      },
    ],
  },
];
