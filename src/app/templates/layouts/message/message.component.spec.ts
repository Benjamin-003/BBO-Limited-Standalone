/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ErreurComponent } from './message.component';

describe('ErreurComponent', () => {
  let component: ErreurComponent;
  let fixture: ComponentFixture<ErreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ErreurComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
