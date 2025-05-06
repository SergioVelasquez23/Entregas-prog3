import { TestBed } from '@angular/core/testing';

import { ComboMachineryService } from './combo-machinery.service';

describe('ComboMachineryService', () => {
  let service: ComboMachineryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComboMachineryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
