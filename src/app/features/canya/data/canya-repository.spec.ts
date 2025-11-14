import { TestBed } from '@angular/core/testing';

import { CanyaRepository } from './canya-repository';

describe('CanyaRepository', () => {
  let service: CanyaRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanyaRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
