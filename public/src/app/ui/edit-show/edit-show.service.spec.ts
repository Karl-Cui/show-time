import { TestBed } from '@angular/core/testing';

import { EditShowService } from './edit-show.service';

describe('EditShowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditShowService = TestBed.get(EditShowService);
    expect(service).toBeTruthy();
  });
});
