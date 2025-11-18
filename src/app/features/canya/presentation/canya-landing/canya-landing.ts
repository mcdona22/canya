import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { canyasBasePath } from '../../../../routing/app-routes';
import { CanyaService } from '../../application/canya-service';
import { JsonPipe } from '@angular/common';
import { CanyaSummary } from '../canya-summary/canya-summary';

@Component({
  selector: 'app-canya-landing',
  imports: [MatButtonModule, JsonPipe, CanyaSummary],
  templateUrl: './canya-landing.html',
  styleUrl: './canya-landing.scss',
})
export class CanyaLanding {
  router = inject(Router);
  canyaService = inject(CanyaService);

  canyas = this.canyaService.watchAllCanyas();

  orderedCanyas = computed(() => {
    // 1. Create a shallow copy of the array to avoid mutating the signal's value
    const canyasCopy = [...this.canyas()];

    return canyasCopy.sort((c1, c2) => {
      // Get the millisecond values for comparison.
      // Use MAX_SAFE_INTEGER if the slot is undefined (no slots),
      // ensuring these items are pushed to the end.
      const date1 =
        c1.findEarliestSlot()?.toMillis() ?? Number.MAX_SAFE_INTEGER;
      const date2 =
        c2.findEarliestSlot()?.toMillis() ?? Number.MAX_SAFE_INTEGER;

      // Sort Ascending (Earliest Date First): date1 - date2
      return date1 - date2;
    });
  });

  onNewClick() {
    const path = `/${canyasBasePath}/new`;
    console.log(`New Canya navigation`, path);
    this.router.navigateByUrl(path).then();
  }
}
