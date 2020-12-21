/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CariTanimService } from './CariTanim.service';

describe('Service: CariTanim', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CariTanimService]
    });
  });

  it('should ...', inject([CariTanimService], (service: CariTanimService) => {
    expect(service).toBeTruthy();
  }));
});
