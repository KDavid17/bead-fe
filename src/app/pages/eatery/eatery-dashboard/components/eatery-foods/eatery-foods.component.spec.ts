import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EateryFoodsComponent } from './eatery-foods.component';

describe('EateryFoodsComponent', () => {
  let component: EateryFoodsComponent;
  let fixture: ComponentFixture<EateryFoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EateryFoodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EateryFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
