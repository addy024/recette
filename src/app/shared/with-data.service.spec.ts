import { TestBed } from '@angular/core/testing';

import { WithDataService } from './with-data.service';

describe('WithDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WithDataService = TestBed.get(WithDataService);
    expect(service).toBeTruthy();
  });
});
