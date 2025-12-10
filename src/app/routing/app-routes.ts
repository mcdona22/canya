import { Routes } from '@angular/router';
import { LandingPage } from '../features/landing-page/landing-page';
import { CanyaLanding } from '../features/canya/presentation/canya-landing/canya-landing';
import { CanyaForm } from '../features/canya/presentation/canya-form/canya-form';
import { CanyaDetail } from '../features/canya/presentation/canya-detail/canya-detail';

export const canyasBasePath = 'canya';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    title: 'Canya Home',
  },
  {
    path: 'gangs',
    loadChildren: () => {
      console.log(`Loading child routes`);
      return import('../features/gangs/gang-routes').then(
        (m) => m.GANGS_ROUTES,
      );
    },
    // children: [
    //   { path: '', component: Gangs, title: 'Gangs' },
    //   {
    //     path: ':id',
    //     component: GangsLayoutComponent,
    //     providers: [CanyaDetailStore],
    //     // resolve: [detailResolver],
    //     children: [
    //       {
    //         path: '',
    //         component: GangDetail,
    //
    //         title: 'With ID',
    //       },
    //       {
    //         path: 'edit',
    //         component: GangDetail,
    //         title: 'Editing',
    //       },
    //     ],
    //   },
    // ],
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
