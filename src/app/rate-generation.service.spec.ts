import { TestBed } from '@angular/core/testing';

import { RateGenerationService } from './rate-generation.service';

describe('RateGenerationService', () => {
  let service: RateGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
