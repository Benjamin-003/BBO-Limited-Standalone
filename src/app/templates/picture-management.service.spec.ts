/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { PictureManagementService } from './picture-management.service';

describe('Service: PictureManagement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PictureManagementService]
    });
  });

  it('should ...', inject([PictureManagementService], (service: PictureManagementService) => {
    expect(service).toBeTruthy();
  }));
});
