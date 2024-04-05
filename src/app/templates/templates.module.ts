import { PictureCardComponent } from './layouts/picture-card/picture-card.component';
import { MessageManagementService } from './message-management.service';
import { MessageComponent } from './layouts/message/message.component';
import { NavComponent } from './layouts/nav/nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './layouts/auth/auth.component';
import { MasterPageComponent } from './layouts/master-page/master-page.component';
import { TemplateRouteRoutes } from './template-route.routing';
import { GenericBreadcrumbComponent } from './layouts/generic-breadcrumb/generic-breadcrumb.component';

@NgModule({
    imports: [
        TemplateRouteRoutes,
        CommonModule,
        AuthComponent,
        MasterPageComponent,
        NavComponent,
        MessageComponent,
        PictureCardComponent,
        GenericBreadcrumbComponent
    ],
    exports: [
        AuthComponent,
        MasterPageComponent,
        NavComponent,
        MessageComponent, PictureCardComponent,
        GenericBreadcrumbComponent
    ],
    providers: [MessageManagementService]
})

export class TemplatesModule { }
