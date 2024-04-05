import { TokenService } from '../../../token.service';
import { CartItem } from '../../shared/interfaces/cartItem';
import { CartService } from '../../shared/services/cart.service';
import { Component, OnInit} from '@angular/core';
import { CartDetailComponent } from '../../components/cart-detail/cart-detail.component';
@Component({
    selector: 'ltd-product-user-cart',
    templateUrl: './product-user-cart.component.html',
    standalone: true,
    imports: [CartDetailComponent]
})
export class ProductUserCartComponent implements OnInit {
public cartItems?: CartItem[]
public id!: number;

  constructor(private cartService: CartService,private token: TokenService) {}
  ngOnInit() {
    this.token.currentId.subscribe(resultId=>{
      this.id=resultId
    })
    this.cartItems = this.cartService.getUserCart(this.id)
  }
//Appel le service pour incrémenter ou décrémenter la quantité par 1
  incrementOrDecrementQuantity(quantityToModify:{id: string, operation: string}){
    this.cartService.IncrementOrDecrementItemQuantity(quantityToModify)
  }

  //Appel le service pour supprimer une ligne d'un panier
  deleteItem(id:string){
    this.cartService.deleteItemFromCart(id)
  }
}
