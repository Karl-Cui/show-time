import { TestBed } from '@angular/core/testing';

import { AdminUserListService } from './admin-user-list.service';

describe('AdminUserListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminUserListService = TestBed.get(AdminUserListService);
    expect(service).toBeTruthy();
  });
});
