import { TestBed } from '@angular/core/testing';

import { AppUserRepository } from './app-user-repository';

describe('AppUserRepository', () => {
  let service: AppUserRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUserRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
