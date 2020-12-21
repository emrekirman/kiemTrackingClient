/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OlcuBirimService } from './OlcuBirim.service';

describe('Service: OlcuBirim', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OlcuBirimService]
    });
  });

  it('should ...', inject([OlcuBirimService], (service: OlcuBirimService) => {
    expect(service).toBeTruthy();
  }));
});
