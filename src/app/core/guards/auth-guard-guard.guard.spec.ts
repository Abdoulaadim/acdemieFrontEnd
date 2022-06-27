import { TestBed } from '@angular/core/testing';

import { AuthGuardGuardGuard } from './auth-guard-guard.guard';

describe('AuthGuardGuardGuard', () => {
  let guard: AuthGuardGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
