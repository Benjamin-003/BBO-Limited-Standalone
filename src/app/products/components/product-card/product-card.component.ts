import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../shared/models/product';
import { NgIf, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'ltd-product-card',
    templateUrl: './product-card.component.html',
    standalone: true,
    imports: [NgIf, CurrencyPipe]
})
export class ProductCardComponent {
  @Input() product?: Product;
  @Output() emitOrder = new EventEmitter();
  @Input() showAddToCartButton = false;

  constructor() { }

  //Contient et génère le set du toaster
  clickAddCart(productSelected?:Product) {
    this.emitOrder.emit(productSelected)
  }
}