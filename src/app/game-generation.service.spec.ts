import { TestBed } from '@angular/core/testing';

import { GameGenerationService } from './game-generation.service';

describe('GameGenerationService', () => {
  let service: GameGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
