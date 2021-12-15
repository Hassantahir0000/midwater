import { TestBed } from '@angular/core/testing';

import { AppOnStartService } from './app-on-start.service';

describe('AppOnStartService', () => {
  let service: AppOnStartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppOnStartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
