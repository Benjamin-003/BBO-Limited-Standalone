import { ProductsService } from './products.service';
import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, EMPTY, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product>{
  constructor(private productService: ProductsService) { }
  public produit!: Observable<Product>
  //Recupère les informations du produit depuis la route et le renvoi au composant du détail des produit. Si l'API renvoi une erreur 404, le resolver ne renvoi rien
  resolve(route: ActivatedRouteSnapshot): Observable<Product>|Observable<never> {
    const productID = route.paramMap.get('id')!
    this.produit = this.productService.getProductByID(productID).pipe(ligneProduit => { return ligneProduit }, catchError((error) => {
      console.log(error)
      return EMPTY;
    }))
    return this.produit
  }
}
