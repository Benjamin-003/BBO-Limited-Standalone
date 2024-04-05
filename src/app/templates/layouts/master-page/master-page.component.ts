import { AuthService } from './../../../authentification/auth.service';
import { CartService } from '../../../cart/shared/services/cart.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { TokenService } from '../../../token.service';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

@Component({
    selector: 'ltd-master-page',
    templateUrl: './master-page.component.html',
    styleUrls: ['./master-page.component.scss'],
    standalone: true,
    imports: [NavComponent, RouterOutlet]
})
export class MasterPageComponent implements OnInit {
  public isScreenWide!: boolean;
  public totalQuantitePanier!: string;
  public isLoggedIn = false;
  private readonly screenWidenessThreshold = 1200;
  public currentNameUser!: string;

  constructor(private readonly cartService: CartService, private readonly authService: AuthService, private readonly tokenStorage: TokenService,private readonly route: Router) {
    this.tokenStorage.getUtilisateur();
    this.getLoggedUserName();
  }

  //On recupère la largeur de l'affichage en pixels dès que le DOM est chargé
  ngOnInit() {
    this.onResize();
  }

  ngDoCheck() {
    if (this.cartService.currentTotalCart) {
      this.getLoggedUserCard();
    }
    if (this.tokenStorage.currentName) {
      this.tokenStorage.getUtilisateur();
      this.getLoggedUserName();
    }
  }

  //Permet de récuperer le prénom de l'utilisateur connecté.
  getLoggedUserName() {
    this.tokenStorage.currentName.subscribe((resultName: string) => {
      if (resultName) {
        this.currentNameUser = resultName;
        this.isLoggedIn = true
      }
      else {
        this.isLoggedIn = false
      }
    })
  }

  //Event listener qui détecte le changement de taille d'écran en pixels
  @HostListener('window:resize', ['$event.target']) onResize() {
    this.isScreenWide = this.getWidth() >= this.screenWidenessThreshold;
  }

  //retourne la largeur interne en pixel, cette méthode permet de déterminer la largeur au chargement du DOM en pixels
  getWidth() {
    return window.innerWidth;
  }

  //Masque ou affiche la sidenav quand l'utilisateur clique sur le burger menu ou la croix
  burgerMenuClick() {
    this.isScreenWide = !this.isScreenWide
  }

  //Appel le service pour déconnecter l'utilisateur
  disconnectUser() {
    this.authService.onClickDisconnectButton();
  }

  //Appel le service pour récupérer le total du panier
  getLoggedUserCard() {
    this.cartService.getTotalUserCart()
    this.cartService.currentTotalCart.subscribe((totalCart: string) => {
      this.totalQuantitePanier = totalCart
    })
  }

  //Redige l'utilisateur vers son panier si ce dernier n'est pas vide, sinon renvoi vers la page d'erreur
  clickOnCart(){
    if(this.totalQuantitePanier==='0'){
        this.route.navigate(['panier/erreur'])
    }
    else{
      this.route.navigate(['panier/details'])
    }
  }
}
