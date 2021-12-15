import { TestBed } from '@angular/core/testing';

import { AppNetworkService } from './app-network.service';

describe('AppNetworkService', () => {
  let service: AppNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
