import { TestBed } from '@angular/core/testing';

import { WalletDataService } from './wallet-data.service';

describe('WalletDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalletDataService = TestBed.get(WalletDataService);
    expect(service).toBeTruthy();
  });
});
