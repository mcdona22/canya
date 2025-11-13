import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanyaForm } from './canya-form';

describe('CanyaForm', () => {
  let component: CanyaForm;
  let fixture: ComponentFixture<CanyaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanyaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanyaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
