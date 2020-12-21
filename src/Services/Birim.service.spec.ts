/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BirimService } from './Birim.service';

describe('Service: Birim', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BirimService]
    });
  });

  it('should ...', inject([BirimService], (service: BirimService) => {
    expect(service).toBeTruthy();
  }));
});
