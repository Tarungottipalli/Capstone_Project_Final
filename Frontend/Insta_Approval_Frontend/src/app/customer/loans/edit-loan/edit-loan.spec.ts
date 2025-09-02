import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoan } from './edit-loan';

describe('EditLoan', () => {
  let component: EditLoan;
  let fixture: ComponentFixture<EditLoan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLoan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLoan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
