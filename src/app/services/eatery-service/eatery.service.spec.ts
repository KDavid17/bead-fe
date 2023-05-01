import { TestBed } from '@angular/core/testing';

import { EateryService } from './eatery.service';

describe('EateryService', () => {
  let service: EateryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EateryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
