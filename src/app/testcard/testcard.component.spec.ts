import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcardComponent } from './testcard.component';

describe('TestcardComponent', () => {
  let component: TestcardComponent;
  let fixture: ComponentFixture<TestcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestcardComponent]
    });
    fixture = TestBed.createComponent(TestcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
