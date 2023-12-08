import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneprudctComponent } from './oneprudct.component';

describe('OneprudctComponent', () => {
  let component: OneprudctComponent;
  let fixture: ComponentFixture<OneprudctComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneprudctComponent]
    });
    fixture = TestBed.createComponent(OneprudctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
