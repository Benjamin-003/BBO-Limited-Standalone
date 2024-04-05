import { Products } from './products.routing';
import { ProductResolverService } from './shared/services/product-resolver.service';
import { TemplatesModule } from './../templates/templates.module';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { ProductsService } from './shared/services/products.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
//Permet de définir les données de localisation qu'Angular doit utiliser
registerLocaleData(localeFr, 'fr-Fr');
@NgModule({
    imports: [
        CommonModule,
        Products,
        TemplatesModule,
        ProductListPageComponent,
        ProductListComponent, ProductDetailPageComponent, ProductCardComponent
    ],
    exports: [ProductListPageComponent,
        ProductListComponent, ProductDetailPageComponent, ProductCardComponent],
    providers: [{
            provide: LOCALE_ID,
            useValue: 'fr-FR'
        }, ProductsService, ProductResolverService]
})
export class ProductsModule { }
