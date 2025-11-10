import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthButton } from './auth-button';
import { AuthService } from '../../application/auth-service';
import { createAuthServiceSpy } from '../../application/auth-test-utils';

describe('AuthButton', () => {
  let component: AuthButton;
  let fixture: ComponentFixture<AuthButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthButton],
      providers: [{ provide: AuthService, useValue: createAuthServiceSpy() }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
