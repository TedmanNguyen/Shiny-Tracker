import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntInstanceComponent } from './hunt-instance.component';

describe('HuntInstanceComponent', () => {
  let component: HuntInstanceComponent;
  let fixture: ComponentFixture<HuntInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntInstanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
