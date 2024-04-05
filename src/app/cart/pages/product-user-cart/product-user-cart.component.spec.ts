/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductUserCartComponent } from './product-user-cart.component';

describe('ProductUserCartComponent', () => {
  let component: ProductUserCartComponent;
  let fixture: ComponentFixture<ProductUserCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ProductUserCartComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUserCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
