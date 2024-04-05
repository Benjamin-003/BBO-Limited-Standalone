/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SuccesComponent } from './succes.component';

describe('SuccèsComponent', () => {
  let component: SuccesComponent;
  let fixture: ComponentFixture<SuccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [SuccesComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
