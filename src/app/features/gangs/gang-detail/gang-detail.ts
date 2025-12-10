import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CanyaDetailStore } from '../canya-detail-store';
import { GangTile } from '../gang-tile/gang-tile';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gang-detail',
  imports: [GangTile, MatButton, RouterLink],
  templateUrl: './gang-detail.html',
  styleUrl: './gang-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [CanyaDetailStore],
})
export class GangDetail implements OnDestroy, OnInit {
  ngOnInit(): void {
    // console.log(`Initializing and creating the store`);
    // this.detailStore.init('hard-coded');
  }

  ngOnDestroy(): void {
    console.log('🔥🔥🔥 COMPONENT DESTROYED: GangDetail 🔥🔥🔥');
  }

  detailStore = inject(CanyaDetailStore);

  detailLink = computed(() => `/gangs/${this.detailStore.id()}`);
  editLink = computed(() => `${this.detailLink()}/edit`);
}
