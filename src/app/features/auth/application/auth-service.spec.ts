import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';
import { AppUserRepository } from '../../app-user/data/app-user-repository';

const mockAuthRepository = {
  // Mock the signal properties used by AuthService
  authState: () => null,
  authenticated: () => false,

  // If AuthService calls any methods, mock them too (e.g., signInWithGoogle)
  signInWithGoogle: () => Promise.resolve(null),
  signOut: () => Promise.resolve(),
};

const mockAppUserRepository = {
  writeDocument: () => Promise.resolve(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthRepository },
        { provide: AppUserRepository, useValue: mockAppUserRepository },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
