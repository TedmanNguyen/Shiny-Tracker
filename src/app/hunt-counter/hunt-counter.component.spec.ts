import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntCounterComponent } from './hunt-counter.component';

describe('HuntCounterComponent', () => {
  let component: HuntCounterComponent;
  let fixture: ComponentFixture<HuntCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
