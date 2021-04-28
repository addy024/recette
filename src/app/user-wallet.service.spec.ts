import { TestBed } from '@angular/core/testing';

import { UserWalletService } from './user-wallet.service';

describe('UserWalletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserWalletService = TestBed.get(UserWalletService);
    expect(service).toBeTruthy();
  });
});
