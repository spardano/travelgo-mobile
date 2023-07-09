import { TestBed } from '@angular/core/testing';

import { ListbookingService } from './listbooking.service';

describe('ListbookingService', () => {
  let service: ListbookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListbookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
