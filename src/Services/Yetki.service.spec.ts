/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YetkiService } from './Yetki.service';

describe('Service: Yetki', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YetkiService]
    });
  });

  it('should ...', inject([YetkiService], (service: YetkiService) => {
    expect(service).toBeTruthy();
  }));
});
