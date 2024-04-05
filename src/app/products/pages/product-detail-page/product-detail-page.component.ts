import { PictureManagementService } from './../../../templates/picture-management.service';
import { Product } from './../../shared/models/product';
import { map, Observable } from 'rxjs';
import { CartService } from '../../../cart/shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PictureCardComponent } from '../../../templates/layouts/picture-card/picture-card.component';
import { GenericBreadcrumbComponent } from '../../../templates/layouts/generic-breadcrumb/generic-breadcrumb.component';

@Component({
    selector: 'ltd-product-detail-page',
    templateUrl: './product-detail-page.component.html',
    styles: [],
    standalone: true,
    imports: [GenericBreadcrumbComponent, PictureCardComponent, ProductCardComponent, AsyncPipe]
})
export class ProductDetailPageComponent implements OnInit{
  public imageURL$?: Observable<string>;
  public product$!: Observable<Product>;
  private dimensions:number[]= [758, 482];
  constructor(private readonly activatedRoute: ActivatedRoute, 
    private readonly cartService: CartService,
    private readonly pictureService: PictureManagementService) {
    this.product$ = this.activatedRoute.data.pipe(map(productLine => { return productLine['product'] }))
  }
  ngOnInit() {
    this.imageURL$ = this.pictureService.getURLfromAPI(this.dimensions)
  }

  //Appel le service pour mettre a jour le panier de l'utilisateur
  handOrder(productDatas: Product) {
    this.cartService.updateCart(productDatas);
  }
}
