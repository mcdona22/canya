import { Injectable } from '@angular/core';
import { AbstractRepository } from '../../../common/data/abstract-repository';
import { ICanyaEvent } from './i-canya-event';

@Injectable({
  providedIn: 'root',
})
export class CanyaRepository extends AbstractRepository<ICanyaEvent> {
  constructor() {
    super('canya-events');
  }
}
