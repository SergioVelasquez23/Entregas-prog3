import { TestBed } from '@angular/core/testing';

import { SpecialityOperatorService } from './speciality-operator.service';

describe('SpecialityOperatorService', () => {
  let service: SpecialityOperatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialityOperatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
