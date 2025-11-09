import { TestBed } from '@angular/core/testing';

import { AuthRepository } from './auth-repository';
import { Auth, provideAuth, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';

const mockFirebaseApp = {} as FirebaseApp;
const authStateSubject = new BehaviorSubject<User | null>(null);

const mockAuth = {
  // authState is the stream the repository converts to a signal
  authState: authStateSubject.asObservable(),

  // Mock sign-in to return a successful promise structure
  signInWithPopup: jasmine.createSpy('signInWithPopup').and.resolveTo({
    user: {
      uid: 'mock-user-id',
      email: 'test@mock.com',
      displayName: 'mock displayName',
      photoURL: '',
    } as User,
  } as any),

  // Mock sign-out function
  signOut: jasmine.createSpy('signOut').and.resolveTo(undefined),

  currentUser: null,
} as unknown as Auth;

describe('AuthRepository', () => {
  let service: AuthRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideAuth(() => mockAuth as unknown as Auth),
        { provide: Auth, useValue: mockAuth },
      ],
    });
    service = TestBed.inject(AuthRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
