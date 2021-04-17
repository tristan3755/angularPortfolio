import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MokupComponent } from './mokup.component';

describe('MokupComponent', () => {
  let component: MokupComponent;
  let fixture: ComponentFixture<MokupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MokupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MokupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
