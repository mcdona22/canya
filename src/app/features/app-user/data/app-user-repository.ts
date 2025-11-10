import { Injectable } from '@angular/core';
import { AbstractRepository } from '../../../common/data/abstract-repository';
import { AppUser } from './app-user';

@Injectable({
  providedIn: 'root',
})
export class AppUserRepository extends AbstractRepository<AppUser> {
  constructor() {
    super('app-users');
  }
}
