import { TestBed } from '@angular/core/testing';

import { insuranceService } from './insurance.service';

describe('InsuranceService', () => {
  let service: insuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(insuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
