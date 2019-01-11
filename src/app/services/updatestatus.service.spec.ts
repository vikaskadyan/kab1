import { TestBed, inject } from '@angular/core/testing';

import { UpdatestatusService } from './updatestatus.service';

describe('UpdatestatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatestatusService]
    });
  });

  it('should be created', inject([UpdatestatusService], (service: UpdatestatusService) => {
    expect(service).toBeTruthy();
  }));
});
