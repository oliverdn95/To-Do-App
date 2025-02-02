import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyFormComponent } from './sticky-form.component';

describe('StickyFormComponent', () => {
  let component: StickyFormComponent;
  let fixture: ComponentFixture<StickyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
