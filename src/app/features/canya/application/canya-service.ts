import { inject, Injectable } from '@angular/core';
import { ICanyaEvent } from '../data/i-canya-event';
import { CanyaRepository } from '../data/canya-repository';
import { from, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanyaEvent } from '../data/CanyaEvent';
import { AppUserRepository } from '../../app-user/data/app-user-repository';

@Injectable({
  providedIn: 'root',
})
export class CanyaService {
  canyaRepository = inject(CanyaRepository);
  appUserRepository = inject(AppUserRepository);

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

  watchCanya(canyaId: string) {
    console.log(`CanyaService : Watching the canya at`, canyaId);
    const canya$ = this.canyaRepository.watchDocument(canyaId);
    return canya$.pipe(
      tap((canya) => console.log(`Canya Found:`, canya)),
      map((canya) => new CanyaEvent(canya!)),
    );
  }

  watchRelevantCanyas(IDs: string[]) {
    const users$ = this.appUserRepository.watchDocumentsInList(IDs);

    return toSignal(users$, { initialValue: [] });
  }
}
