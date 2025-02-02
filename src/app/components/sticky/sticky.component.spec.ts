import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StickyComponent } from './sticky.component';

describe('StickyComponent', () => {
  let component: StickyComponent;
  let fixture: ComponentFixture<StickyComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
