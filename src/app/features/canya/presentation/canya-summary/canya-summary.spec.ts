import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanyaSummary } from './canya-summary';

describe('CanyaSummary', () => {
  let component: CanyaSummary;
  let fixture: ComponentFixture<CanyaSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanyaSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanyaSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
