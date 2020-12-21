/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MesajService } from './Mesaj.service';

describe('Service: Mesaj', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MesajService]
    });
  });

  it('should ...', inject([MesajService], (service: MesajService) => {
    expect(service).toBeTruthy();
  }));
});
