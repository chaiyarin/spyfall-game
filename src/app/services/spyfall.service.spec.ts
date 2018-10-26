import { TestBed, inject } from '@angular/core/testing';

import { SpyfallService } from './spyfall.service';

describe('SpyfallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpyfallService]
    });
  });

  it('should be created', inject([SpyfallService], (service: SpyfallService) => {
    expect(service).toBeTruthy();
  }));
});
