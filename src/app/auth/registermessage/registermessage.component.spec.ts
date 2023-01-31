import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistermessageComponent } from './registermessage.component';

describe('RegistermessageComponent', () => {
  let component: RegistermessageComponent;
  let fixture: ComponentFixture<RegistermessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistermessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistermessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
