import { TestBed } from '@angular/core/testing';

import { AppOrderService } from './app-order.service';

describe('AppOrderService', () => {
  let service: AppOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
