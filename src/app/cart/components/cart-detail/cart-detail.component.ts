import { CartItem } from'src/app/cart/shared/interfaces/cartItem';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ItemCartComponent } from '../item-cart/item-cart.component';
import { NgFor, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'ltd-cart-detail',
    templateUrl: './cart-detail.component.html',
    standalone: true,
    imports: [NgFor, ItemCartComponent, CurrencyPipe]
})
export class CartDetailComponent implements OnInit{
  @Input() cartItems?: CartItem[];
  cartItemsUser?: CartItem[];
  @Output() idToEmitForDeletion = new EventEmitter<string>()
  @Output() idToEmitForQuantityModification= new EventEmitter<{id: string, operation: string}>()
  public total = 0
 
  ngOnInit(){
    this.cartItemsUser=this.cartItems
    this.cartItemsUser?.forEach(resultLine => {
    this.total+=(resultLine.quantity*resultLine.unitPrice)
    });
  }

  incrementOrDecrementQuantity(quantityToModify:{id: string, operation: string}){
    this.idToEmitForQuantityModification.emit(quantityToModify)
  }

  deleteItem(id:string){
    this.idToEmitForDeletion.emit(id)
  }
}
