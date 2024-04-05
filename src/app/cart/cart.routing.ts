import { CartEmptyComponent } from './components/cart-empty/cart-empty.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductUserCartComponent } from './pages/product-user-cart/product-user-cart.component';

const routes: Routes = [
  { path: 'details', component: ProductUserCartComponent},
  { path: 'erreur', component: CartEmptyComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutes {};
