import { TestBed } from '@angular/core/testing';

import { WithdrawnService } from './withdrawn.service';

describe('WithdrawnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WithdrawnService = TestBed.get(WithdrawnService);
    expect(service).toBeTruthy();
  });
});
