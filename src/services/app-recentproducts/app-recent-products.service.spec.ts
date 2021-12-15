import { TestBed } from '@angular/core/testing';

import { AppRecentProductsService } from './app-recent-products.service';

describe('AppRecentProductsService', () => {
  let service: AppRecentProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRecentProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
