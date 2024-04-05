import {Observable} from 'rxjs';
import {Component} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ProductsService} from '../../shared/services/products.service';
import { AsyncPipe } from '@angular/common';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
    selector: 'ltd-product-list-page',
    templateUrl: './product-list-page.component.html',
    standalone: true,
    imports: [ProductListComponent, AsyncPipe]
})
export class ProductListPageComponent {
    public products$!: Observable<Product[]>;

  constructor(private readonly serviceProduit: ProductsService) {
    this.products$ = this.serviceProduit.getAllProducts()
  }
}
