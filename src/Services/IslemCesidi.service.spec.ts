/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IslemCesidiService } from './IslemCesidi.service';

describe('Service: IslemCesidi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IslemCesidiService]
    });
  });

  it('should ...', inject([IslemCesidiService], (service: IslemCesidiService) => {
    expect(service).toBeTruthy();
  }));
});
