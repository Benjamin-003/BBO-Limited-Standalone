import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CartItem } from '../../shared/interfaces/cartItem';
import { CurrencyPipe } from '@angular/common';
@Component({
    selector: '[ltdItemCart]',
    templateUrl: './item-cart.component.html',
    styles: [],
    standalone: true,
    imports: [CurrencyPipe]
})
export class ItemCartComponent{
  @Input() cart!: CartItem;
  @Output() idToEmitForDeletion = new EventEmitter<string>()
  @Output() idToEmitForQuantityModification= new EventEmitter<{id: string, operation: string}>()
  
  deleteItem(id:string){
    this.idToEmitForDeletion.emit(id)
  }

  incrementQuantity(id:string){
    const valuetoEmit = {"id":id,"operation":"increment"}
    this.idToEmitForQuantityModification.emit(valuetoEmit)
  }

  decrementQuantity(id:string){
    const valuetoEmit = {"id":id,"operation":"decrement"}
    this.idToEmitForQuantityModification.emit(valuetoEmit)
  }
  
}


