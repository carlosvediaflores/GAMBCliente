import { TestBed } from '@angular/core/testing';

import { HojarutaService } from './hojaruta.service';

describe('HojarutaService', () => {
  let service: HojarutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HojarutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
