import { TestBed } from '@angular/core/testing';

import { MunicipalityRulerService } from '../municipality-ruler.service';

describe('MunicipalityRulerService', () => {
  let service: MunicipalityRulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipalityRulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
