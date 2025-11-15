import { inject, Injectable } from '@angular/core';
import { ICanyaEvent } from '../data/i-canya-event';
import { CanyaRepository } from '../data/canya-repository';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanyaService {
  canyaRepository = inject(CanyaRepository);

  createCanya(canya: ICanyaEvent) {
    console.log(`CanyaService: creating canya`, canya);

    return from(this.canyaRepository.writeDocument(canya));
  }
}
