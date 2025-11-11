/// <reference types="jasmine" />

import { AppUser } from '../../app-user/data/app-user';
import { signal } from '@angular/core';
import { AuthService } from './auth-service';

export function createAuthServiceSpy(): jasmine.SpyObj<AuthService> {
  const mockUser: AppUser = {
    id: 'test-uid-123',
    displayName: 'Test User',
    email: 'test@example.com',
    photoURL: 'http://example.com/photo.jpg',
  };

  // 'jasmine' is automatically available globally in test environments
  const spy = jasmine.createSpyObj<AuthService>(
    'AuthService',
    ['signInWithGoogle', 'signOut'],
    {
      // Mock the public signal properties used by the component
      authenticated: signal(false),
      currentUser: signal<AppUser | null>(null),
    },
  );

  // Configure the return values for the spied methods
  spy.signInWithGoogle.and.returnValue(Promise.resolve(mockUser));
  spy.signOut.and.returnValue(Promise.resolve());

  return spy;
}
