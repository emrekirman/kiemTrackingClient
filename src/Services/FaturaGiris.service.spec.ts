/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FaturaGirisService } from './FaturaGiris.service';

describe('Service: FaturaGiris', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaturaGirisService]
    });
  });

  it('should ...', inject([FaturaGirisService], (service: FaturaGirisService) => {
    expect(service).toBeTruthy();
  }));
});
