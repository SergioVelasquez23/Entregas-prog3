import { TestBed } from '@angular/core/testing';

import { FacturaService } from './bill.service';

describe('FacturaService', () => {
  let service: FacturaService
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
