import { TestBed } from '@angular/core/testing';

import { ShowFormService } from './show-form.service';

describe('ShowFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowFormService = TestBed.get(ShowFormService);
    expect(service).toBeTruthy();
  });
});
