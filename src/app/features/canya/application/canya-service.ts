import { inject, Injectable, Signal } from '@angular/core';
import { ICanyaEvent } from '../data/i-canya-event';
import { CanyaRepository } from '../data/canya-repository';
import { from, map, of, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
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

  watchCanya(canyaIdSignal: Signal<string | undefined>) {
    console.log(`CanyaService : Watching the canya at`, canyaIdSignal());
    const canyaId$ = toObservable(canyaIdSignal);

    const canya$ = canyaId$.pipe(
      switchMap((id) => {
        if (!id) return of(undefined);
        return this.canyaRepository
          .watchDocument(id!)
          .pipe(map((canya) => new CanyaEvent(canya!)));
      }),
    );

    return toSignal(canya$, { initialValue: undefined });
  }

  canyaUsers(IDs: Signal<string[]>) {
    const ids$ = toObservable(IDs);
    const usersFromIdList$ = ids$.pipe(
      switchMap((ids) =>
        ids.length > 0 ? this.appUserRepository.watchDocumentsInList(ids) : [],
      ),
    );

    return toSignal(usersFromIdList$, { initialValue: [] });
  }
}
