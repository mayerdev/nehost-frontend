import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVserversComponent } from './admin-vservers.component';

describe('AdminVserversComponent', () => {
  let component: AdminVserversComponent;
  let fixture: ComponentFixture<AdminVserversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVserversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVserversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
