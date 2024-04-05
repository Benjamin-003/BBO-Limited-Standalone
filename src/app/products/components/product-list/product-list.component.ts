import { Product } from '../../shared/models/product';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'ltd-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
    imports: [NgFor, ProductCardComponent, RouterLink]
})
export class ProductListComponent {
  @Input() products!: Product[];
}
