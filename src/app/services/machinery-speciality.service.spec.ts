import { TestBed } from '@angular/core/testing';

import { MachinerySpecialityService } from './machinery-speciality.service';

describe('MachinerySpecialityService', () => {
  let service: MachinerySpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachinerySpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
