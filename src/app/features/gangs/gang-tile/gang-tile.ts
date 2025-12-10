import { Component, inject } from '@angular/core';
import { CanyaDetailStore } from '../canya-detail-store';

@Component({
  selector: 'app-gang-tile',
  imports: [],
  templateUrl: './gang-tile.html',
  styleUrl: './gang-tile.scss',
})
export class GangTile {
  detailStore = inject(CanyaDetailStore);
}
