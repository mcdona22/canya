import { Component, inject } from '@angular/core';
import { CanyaDetailStore } from '../canya-detail-store';
import { GangTile } from '../gang-tile/gang-tile';

@Component({
  selector: 'app-gang-detail',
  imports: [GangTile],
  templateUrl: './gang-detail.html',
  styleUrl: './gang-detail.scss',
  // providers: [CanyaDetailStore],
})
export class GangDetail {
  detailStore = inject(CanyaDetailStore);
}
