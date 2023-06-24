import { TestBed } from '@angular/core/testing';

import { JadwalService } from './jadwal.service';

describe('JadwalService', () => {
  let service: JadwalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JadwalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
