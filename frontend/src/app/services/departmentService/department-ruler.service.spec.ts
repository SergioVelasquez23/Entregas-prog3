import { TestBed } from '@angular/core/testing';

import { DepartmentRulerService } from './department-ruler.service';

describe('DepartmentRulerService', () => {
  let service: DepartmentRulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentRulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
