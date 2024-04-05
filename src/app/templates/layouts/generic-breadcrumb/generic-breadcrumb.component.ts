import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from '../../breadcrumb.service';
import { Breadcrumb } from '../../shared/breadcrumb';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'ltd-generic-breadcrumb',
    templateUrl: './generic-breadcrumb.component.html',
    styleUrls: ['./generic-breadcrumb.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, AsyncPipe]
})
export class GenericBreadcrumbComponent{
  breadcrumbs$: Observable<Breadcrumb[]>; 
 
  constructor(private readonly breadcrumbService: BreadcrumbService) { 
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$; 
  } 
}