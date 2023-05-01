import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EateryMenuComponent } from './eatery-menu.component';

describe('EateryMenuComponent', () => {
  let component: EateryMenuComponent;
  let fixture: ComponentFixture<EateryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EateryMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EateryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
