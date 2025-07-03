import { TestBed } from '@angular/core/testing';

import { Grant } from './grant';

describe('Grant', () => {
  let service: Grant;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Grant);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
