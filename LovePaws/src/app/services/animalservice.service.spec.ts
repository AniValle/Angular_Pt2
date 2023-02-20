import { TestBed } from '@angular/core/testing';

import { AnimalserviceService } from './animalservice.service';

describe('AnimalserviceService', () => {
  let service: AnimalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
