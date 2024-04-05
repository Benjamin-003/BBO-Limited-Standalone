import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TemplatesModule } from 'src/app/templates/templates.module';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'ltd-accueil',
    templateUrl: './accueil.component.html',
    standalone: true,
    imports:[CommonModule,TemplatesModule]
})
export class AccueilComponent {
}
