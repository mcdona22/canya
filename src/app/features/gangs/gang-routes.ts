import { GangDetail } from './gang-detail/gang-detail';
import { CanyaDetailStore } from './canya-detail-store';
import { detailResolver } from './detail-resolver';
import { Gangs } from './gangs';
import { Routes } from '@angular/router';
import { GangsLayoutComponent } from './gangs-layout-component';

export const GANGS_ROUTES: Routes = [
  { path: '', component: Gangs, title: 'Gangs' },
  {
    path: ':id',
    resolve: [detailResolver],
    component: GangsLayoutComponent,

    // We will assume you are using the correct shared scope (Layout Component)
    // for persistence between detail/edit. If not, use the GangLayoutComponent here.
    children: [
      {
        path: '',
        component: GangDetail,
        // providers: [CanyaDetailStore], // Scoped to this component instance
        // resolve: [detailResolver],
        title: 'With ID',
      },
      {
        path: 'edit',
        component: GangDetail,
        providers: [CanyaDetailStore], // Scoped to this component instance
        resolve: [detailResolver],
        title: 'Editing',
      },
    ],
  },
];
