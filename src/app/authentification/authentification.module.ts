import { TokenService } from './../token.service';
import { EchecComponent } from './echec/echec.component';
import { TemplatesModule } from './../templates/templates.module';
import { AuthRoutingModuleRoutes } from './authRoutingModule.routing';
import { CreationComponent } from './creation/creation/creation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnexionComponent } from './connexion/connexion.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { SuccesComponent } from './succes/succes.component';


@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModuleRoutes,
        HttpClientModule,
        ReactiveFormsModule,
        TemplatesModule,
        ConnexionComponent, CreationComponent, SuccesComponent, EchecComponent
    ],
    exports: [
        ConnexionComponent,
        CreationComponent,
        SuccesComponent,
        EchecComponent
    ],
    providers: [AuthService, TokenService]
})
export class AuthentificationModule { }
