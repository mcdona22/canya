import { TestBed } from '@angular/core/testing';

import { AppUserRepository } from './app-user-repository';
import { Firestore, provideFirestore } from '@angular/fire/firestore';
import { FirebaseApp, provideFirebaseApp } from '@angular/fire/app';

const mockFirebaseApp = {};
const mockFirestore = {};

describe('AppUserRepository', () => {
  let service: AppUserRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFirebaseApp(() => mockFirebaseApp as unknown as FirebaseApp), // <-- FIX
        provideFirestore(() => mockFirestore as unknown as Firestore),
      ],
    });
    service = TestBed.inject(AppUserRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
