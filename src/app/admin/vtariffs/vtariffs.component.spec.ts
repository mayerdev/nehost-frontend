import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtariffsComponent } from './vtariffs.component';

describe('VtariffsComponent', () => {
  let component: VtariffsComponent;
  let fixture: ComponentFixture<VtariffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VtariffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VtariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
