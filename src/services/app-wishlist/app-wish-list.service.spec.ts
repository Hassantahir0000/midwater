import { TestBed } from '@angular/core/testing';

import { AppWishListService } from './app-wish-list.service';

describe('AppWishListService', () => {
  let service: AppWishListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppWishListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
