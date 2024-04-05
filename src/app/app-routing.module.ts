import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthenticationGuard } from './authentification/guard.service';

export const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full' },
  {path: 'accueil', loadComponent: () => import('./accueil/accueil/accueil.component').then(m => m.AccueilComponent)},
  {path: 'auth', loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule)},
  {path: 'produits', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),data: { breadcrumb: 'Liste des produits'}, canActivate: [
    AuthenticationGuard
  ]},
  {path: 'panier', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),data: { breadcrumb: 'Panier utilisateur'}, canActivate: [
    AuthenticationGuard
  ]}
];

