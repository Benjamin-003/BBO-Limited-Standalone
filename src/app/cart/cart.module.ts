import { ProductUserCartComponent } from './pages/product-user-cart/product-user-cart.component';
import { ItemCartComponent } from './components/item-cart/item-cart.component';
import { CartEmptyComponent } from './components/cart-empty/cart-empty.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutes } from './cart.routing';
import { TemplatesModule } from '../templates/templates.module';


@NgModule({
    imports: [
        CommonModule,
        CartRoutes,
        TemplatesModule,
        CartEmptyComponent, ItemCartComponent, ProductUserCartComponent, CartDetailComponent
    ],
    exports: [CartEmptyComponent, ItemCartComponent, ProductUserCartComponent, CartDetailComponent]
})
export class CartModule { }
