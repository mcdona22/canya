import { inject, Injectable } from '@angular/core';
import { ICanyaEvent } from '../data/i-canya-event';
import { CanyaRepository } from '../data/canya-repository';
import { from, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanyaEvent } from '../data/CanyaEvent';

@Injectable({
  providedIn: 'root',
})
export class CanyaService {
  canyaRepository = inject(CanyaRepository);

  createCanya(canya: ICanyaEvent) {
    try {
      console.log(`CanyaService: creating canya`, canya);
      return from(this.canyaRepository.writeDocument(canya));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  watchAllCanyas() {
    const canyas$ = this.canyaRepository
      .watchCollection()
      .pipe(map((canyas) => canyas.map((c) => new CanyaEvent(c))));

    return toSignal(canyas$, {
      initialValue: [],
    });
  }
}
