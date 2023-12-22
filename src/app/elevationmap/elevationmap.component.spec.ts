import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevationmapComponent } from './elevationmap.component';

describe('ElevationmapComponent', () => {
  let component: ElevationmapComponent;
  let fixture: ComponentFixture<ElevationmapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevationmapComponent]
    });
    fixture = TestBed.createComponent(ElevationmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
