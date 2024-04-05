import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { MessageComponent } from '../../templates/layouts/message/message.component';

@Component({
    selector: 'ltd-echec',
    templateUrl: './echec.component.html',
    styleUrls: ['./echec.component.scss'],
    standalone: true,
    imports: [MessageComponent, RouterLinkWithHref]
})
export class EchecComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
