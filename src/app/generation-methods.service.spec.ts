import { TestBed } from '@angular/core/testing';

import { GenerationMethodsService } from './generation-methods.service';

describe('GenerationMethodsService', () => {
  let service: GenerationMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerationMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
