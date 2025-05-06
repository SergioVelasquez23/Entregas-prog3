import { TestBed } from '@angular/core/testing';

import { MunicipalityConstructionService } from './municipality-construction.service';

describe('MunicipalityConstructionService', () => {
  let service: MunicipalityConstructionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipalityConstructionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
