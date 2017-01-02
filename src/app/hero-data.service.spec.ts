/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeroDataService } from './hero-data.service';

describe('HeroDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroDataService]
    });
  });

  it('should ...', inject([HeroDataService], (service: HeroDataService) => {
    expect(service).toBeTruthy();
  }));
});
