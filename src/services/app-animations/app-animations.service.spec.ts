import { TestBed } from '@angular/core/testing';

import { AppAnimationsService } from './app-animations.service';

describe('AppAnimationsService', () => {
  let service: AppAnimationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppAnimationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
