import { Router } from '@angular/router';
import { Product } from '../../../products/shared/models/product';
import { CartItem } from '../interfaces/cartItem';
import { TokenService } from '../../../token.service';
import { Injectable } from '@angular/core';
import * as Toastify from 'toastify-js';
import { BehaviorSubject } from 'rxjs';
const CART_KEY = 'Panier_Utilisateur_';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  productData!: CartItem
  constructor(private readonly tokenService: TokenService, private route: Router) { }
  //On crée un observable pour exporter les infos du total du panier sur la personne connecté
  private readonly loggedUserTotalCart = new BehaviorSubject('');
  public currentTotalCart = this.loggedUserTotalCart.asObservable();

  //Génère le set du toaster
  toasterCart() {
    Toastify({
      text: "Le produit a bien été ajouté",
      gravity: "bottom",
      position: "right",
      duration: 3000,
      close: true,
      style: {
        background: "#4fbe87",
        "font-family": "Nunito"
      }
    }).showToast();
  }

  //Appel le service des tokens pour récuperer l'ID des utilisateurs
  updateCart(dataproduct: Product) {
    let idUtilisateur!: number;
    this.tokenService.currentId.subscribe((resultId) => {
      if (resultId) {
        idUtilisateur = resultId;
      }
    })
    this.addProductsToCartfromCardProduct(idUtilisateur, dataproduct)
    this.toasterCart()
  }

  //ajoute un article selectionné dans un panier si l'utilisateur a déjà un LocalStorage ou en créer un nouveau le cas contraire
  addProductsToCartfromCardProduct(idUser: number, dataproduct: Product) {
    let parsedCart: CartItem[];
    let productAdded!: CartItem;
    const getCart = localStorage.getItem(`${CART_KEY}${idUser}`);
    if (getCart) {
      parsedCart = JSON.parse(getCart)
      const foundIndex = parsedCart.map(ligne => ligne.id).indexOf(dataproduct.id);
      if (foundIndex != -1) {
        ++parsedCart[foundIndex].quantity
      } else {
        productAdded = { "id": dataproduct.id, "name": dataproduct.name, "unitPrice": dataproduct.price, "quantity": 1 }
        parsedCart.push(productAdded)
      }
      this.updateTotalBadgeCard(parsedCart)
      localStorage.setItem(`${CART_KEY}${idUser}`, JSON.stringify(parsedCart));
    }
    else {
      let newCart: CartItem

      newCart = { "id": dataproduct.id, "name": dataproduct.name, "unitPrice": dataproduct.price, "quantity": 1 }
      this.updateTotalBadgeCard([newCart])
      localStorage.setItem(`${CART_KEY}${idUser}`, JSON.stringify([newCart]));
    }
  }

  //Met jour le subject qui contient le total de la quantité d'un panier pour l'utilisateur connecté
  getTotalUserCart() {
    let parsedCart: CartItem[];
    let idUser!: number
    this.tokenService.currentId.subscribe(idResultat => {
      if (idResultat) {
        idUser = idResultat
      }
    })
    const getCart = localStorage.getItem(`${CART_KEY}${idUser}`);
    if (getCart) {
      parsedCart = JSON.parse(getCart)
      this.updateTotalBadgeCard(parsedCart)
    }
    else {
      this.loggedUserTotalCart.next('0')
    }
  }

  //Calcul le total de la quantité d'un panier
  updateTotalBadgeCard(cart: CartItem[]) {
    let totalProducts = 0;
    totalProducts = cart.map(ligne => ligne?.quantity).reduce((previousValue, currentValue) => previousValue + currentValue,
      0);
    if (totalProducts < 100) {
      this.loggedUserTotalCart.next(totalProducts.toString())
    }
    else if (totalProducts > 99) {
      this.loggedUserTotalCart.next("99+")
    }
  }

  //Renvoi un array du panier de l'utlisateur
  getUserCart(idUser: number) {
    let cartResult: CartItem[]
    const getCurrentCart = localStorage.getItem(`${CART_KEY}${idUser}`);
    cartResult = JSON.parse(getCurrentCart!)
    return cartResult
  }

 //Permet de supprimer tout une ligne du panier
  deleteItemFromCart(idItem: string) {
    let idUtilisateur!: number;
    this.tokenService.currentId.subscribe((resultId) => {
      if (resultId) {
        idUtilisateur = resultId;
      }
    })
    let cartUser = this.getUserCart(idUtilisateur)
    const foundIndex = cartUser.map(ligne => ligne.id).indexOf(idItem);
    if (foundIndex > -1) {
      cartUser.splice(foundIndex, 1);
    }
    if (cartUser.length > 0) {
      localStorage.setItem(`${CART_KEY}${idUtilisateur}`, JSON.stringify(cartUser));
      this.updateTotalBadgeCard(cartUser)
      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate(['panier/details']);
      });
    }
    else {
      localStorage.removeItem(`${CART_KEY}${idUtilisateur}`);
      this.loggedUserTotalCart.next("0")
      this.route.navigate(['panier/erreur'])
    }
  }
//Permet d'incrementer ou de décrémenter par 1 la quantité d'un item du panier .
  IncrementOrDecrementItemQuantity(quantityToModifiy: { id: string, operation: string }) {
    let idUtilisateur!: number;
    this.tokenService.currentId.subscribe((resultId) => {
      if (resultId) {
        idUtilisateur = resultId;
      }
    })
    let cartUser = this.getUserCart(idUtilisateur)
    const foundIndex = cartUser.map(ligne => ligne.id).indexOf(quantityToModifiy.id);
    if (quantityToModifiy.operation === "increment") {
      if (foundIndex > -1) {
        ++cartUser[foundIndex].quantity
      }
    }
    else if (quantityToModifiy.operation === "decrement") {
      if (foundIndex > -1) {
        if (cartUser[foundIndex].quantity > 1) {
          --cartUser[foundIndex].quantity
        }
        else {
          cartUser.splice(foundIndex, 1);
        }
      }
    }
    if (cartUser.length > 0) {
      localStorage.setItem(`${CART_KEY}${idUtilisateur}`, JSON.stringify(cartUser));
      this.updateTotalBadgeCard(cartUser)
      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate(['panier/details']);
      });
    }
    else {
      localStorage.removeItem(`${CART_KEY}${idUtilisateur}`);
      this.loggedUserTotalCart.next("0")
      this.route.navigate(['panier/erreur'])
    }
  }
}