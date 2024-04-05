import { EchecComponent } from './echec/echec.component';
import { SuccesComponent } from './succes/succes.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreationComponent } from './creation/creation/creation.component';

const routes: Routes = [
  {path: 'creation',component: CreationComponent},
  {path: 'authentification',component: ConnexionComponent},
  {path: 'succes',component: SuccesComponent},
  {path: 'echec',component: EchecComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModuleRoutes {};

