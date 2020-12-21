/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StokTanimService } from './StokTanim.service';

describe('Service: StokTanim', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StokTanimService]
    });
  });

  it('should ...', inject([StokTanimService], (service: StokTanimService) => {
    expect(service).toBeTruthy();
  }));
});
