import { ProductResolverService } from './shared/services/product-resolver.service';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';


const routes: Routes = [
  {
    path: '', component: ProductListPageComponent
  },
  {
    path: 'details/:id', component: ProductDetailPageComponent, data: { breadcrumb: (data: any) => `${data.product.name}` },
    resolve: {
      product: ProductResolverService
  }}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Products { }
