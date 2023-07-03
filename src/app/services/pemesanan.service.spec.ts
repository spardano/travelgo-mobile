import { TestBed } from '@angular/core/testing';

import { PemesananService } from './pemesanan.service';

describe('PemesananService', () => {
  let service: PemesananService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PemesananService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
