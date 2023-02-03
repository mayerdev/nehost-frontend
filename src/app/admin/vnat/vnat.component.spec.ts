import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnatComponent } from './vnat.component';

describe('VnatComponent', () => {
  let component: VnatComponent;
  let fixture: ComponentFixture<VnatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VnatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VnatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
