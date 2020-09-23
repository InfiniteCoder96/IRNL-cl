import { TestBed } from '@angular/core/testing';

import { IRService } from './ir.service';

describe('MedicineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IRService = TestBed.get(IRService);
    expect(service).toBeTruthy();
  });
});
