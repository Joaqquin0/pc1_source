import { TestBed } from '@angular/core/testing';

import { FakestoreApiService } from './fakestore-api.service';

describe('FakestoreApiService', () => {
  let service: FakestoreApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakestoreApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
