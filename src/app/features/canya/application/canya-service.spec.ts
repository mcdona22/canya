import { TestBed } from '@angular/core/testing';

import { CanyaService } from './canya-service';

describe('CanyaService', () => {
  let service: CanyaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanyaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
