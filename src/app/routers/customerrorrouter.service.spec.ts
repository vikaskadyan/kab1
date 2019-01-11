import { TestBed, inject } from '@angular/core/testing';

import { CustomerrorrouterService } from './customerrorrouter.service';

describe('CustomerrorrouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerrorrouterService]
    });
  });

  it('should be created', inject([CustomerrorrouterService], (service: CustomerrorrouterService) => {
    expect(service).toBeTruthy();
  }));
});
