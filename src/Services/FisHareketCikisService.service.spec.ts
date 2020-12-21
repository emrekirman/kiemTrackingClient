/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FisHareketCikisServiceService } from './FisHareketCikisService.service';

describe('Service: FisHareketCikisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FisHareketCikisServiceService]
    });
  });

  it('should ...', inject([FisHareketCikisServiceService], (service: FisHareketCikisServiceService) => {
    expect(service).toBeTruthy();
  }));
});
