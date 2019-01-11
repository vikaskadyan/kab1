import { TestBed, inject } from '@angular/core/testing';

import { GetSosrequestTypesService } from './get-sosrequest-types.service';

describe('GetSosrequestTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSosrequestTypesService]
    });
  });

  it('should be created', inject([GetSosrequestTypesService], (service: GetSosrequestTypesService) => {
    expect(service).toBeTruthy();
  }));
});
