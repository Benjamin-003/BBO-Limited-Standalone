/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EchecComponent } from './echec.component';

describe('EchecComponent', () => {
  let component: EchecComponent;
  let fixture: ComponentFixture<EchecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [EchecComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
