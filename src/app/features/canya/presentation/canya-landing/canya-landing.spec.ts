import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanyaLanding } from './canya-landing';

describe('CanyaLanding', () => {
  let component: CanyaLanding;
  let fixture: ComponentFixture<CanyaLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanyaLanding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanyaLanding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
