import { TestBed } from '@angular/core/testing';

import { SubdirService } from './subdir.service';

describe('SubdirService', () => {
  let service: SubdirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubdirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
