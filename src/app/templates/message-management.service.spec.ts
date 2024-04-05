/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageManagementService } from './message-management.service';

describe('Service: MessageManagement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageManagementService]
    });
  });

  it('should ...', inject([MessageManagementService], (service: MessageManagementService) => {
    expect(service).toBeTruthy();
  }));
});
