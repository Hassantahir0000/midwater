import { TestBed } from '@angular/core/testing';

import { AppCartService } from './app-cart.service';

describe('AppCartService', () => {
  let service: AppCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
