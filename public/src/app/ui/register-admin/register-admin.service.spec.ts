import { TestBed } from '@angular/core/testing';

import { RegisterAdminService } from './register-admin.service';

describe('RegisterAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterAdminService = TestBed.get(RegisterAdminService);
    expect(service).toBeTruthy();
  });
});
