/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FisHareketGirisService } from './FisHareketGiris.service';

describe('Service: FisHareketGiris', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FisHareketGirisService]
    });
  });

  it('should ...', inject([FisHareketGirisService], (service: FisHareketGirisService) => {
    expect(service).toBeTruthy();
  }));
});
