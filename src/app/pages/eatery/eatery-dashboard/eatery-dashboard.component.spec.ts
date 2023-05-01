import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EateryDashboardComponent } from './eatery-dashboard.component';

describe('EateryDashboardComponent', () => {
  let component: EateryDashboardComponent;
  let fixture: ComponentFixture<EateryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EateryDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EateryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
