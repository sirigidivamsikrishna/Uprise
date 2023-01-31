import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsmanagementComponent } from './songsmanagement.component';

describe('SongsmanagementComponent', () => {
  let component: SongsmanagementComponent;
  let fixture: ComponentFixture<SongsmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsmanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
