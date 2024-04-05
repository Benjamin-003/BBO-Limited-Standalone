/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CartService } from '../../../cart/shared/services/cart.service';

describe('Service: Cart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService]
    });
  });

  it('should ...', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));
});
