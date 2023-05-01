import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EateryLayoutComponent } from './eatery-layout.component';

describe('EateryLayoutComponent', () => {
  let component: EateryLayoutComponent;
  let fixture: ComponentFixture<EateryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EateryLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EateryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
