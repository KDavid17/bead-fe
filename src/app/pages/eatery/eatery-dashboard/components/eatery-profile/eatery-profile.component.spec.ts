import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EateryProfileComponent } from './eatery-profile.component';

describe('EateryProfileComponent', () => {
  let component: EateryProfileComponent;
  let fixture: ComponentFixture<EateryProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EateryProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EateryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
