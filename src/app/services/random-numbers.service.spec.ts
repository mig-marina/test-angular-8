import { TestBed } from '@angular/core/testing';

import { RandomNumbersService } from './random-numbers.service';

describe('RandomNumbersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomNumbersService = TestBed.get(RandomNumbersService);
    expect(service).toBeTruthy();
  });
});
