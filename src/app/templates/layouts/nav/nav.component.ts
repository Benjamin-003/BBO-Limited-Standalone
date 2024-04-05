import { Output, EventEmitter, Component, Input } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
    selector: 'ltd-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLinkActive, RouterLinkWithHref]
})
export class NavComponent {
  @Output() clickOnCross = new EventEmitter();
  @Output() clickDisconnected = new EventEmitter();
  @Output() clickCart = new EventEmitter();
  @Input() totalQuantitePanier!: string;
  @Input() currentNameUser!: string
  @Input() isLoggedIn = false;

  //Appel la méthode pour masquer la sidenav
  emitClickEvent() {
    this.clickOnCross.emit();
  }

  //Gère la déconnexion et appelle la sweetalert
  onClickDisconnectButton() {
    this.clickDisconnected.emit();
  }

  onClickCartIcon(){
    this.clickCart.emit();
  }
}