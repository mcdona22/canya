import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthButton } from './auth-button';
import { AuthService } from '../../application/auth-service';
import { createAuthServiceSpy } from '../../application/auth-test-utils';
import { CoolGoogleButtonComponent } from '@angular-cool/social-login-buttons';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AuthButton', () => {
  let component: AuthButton;
  let fixture: ComponentFixture<AuthButton>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthButton, CoolGoogleButtonComponent],
      providers: [{ provide: AuthService, useValue: createAuthServiceSpy() }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthButton);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('authentication state', () => {
    [
      {
        authState: false,
        expectedClass: 'not-auth',
        description: 'not authenticated',
      },
      {
        authState: true,
        expectedClass: 'is-auth',
        description: 'authenticated',
      },
    ].forEach((scenario) => {
      it(`should show the correct button when ${scenario.description}`, () => {
        if (scenario.authState) {
          // need better control of the testbed- do it later
          pending();
        }
        const expectedCss = `.data-${scenario.expectedClass}`;
        const button = debugElement.query(By.css(expectedCss));
        expect(button).toBeTruthy();
      });
    });
  });
});
