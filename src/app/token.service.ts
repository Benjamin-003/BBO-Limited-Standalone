import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const USER_KEY = 'auth-utilisateur';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private loggedUserName = new BehaviorSubject("");
  //On crée un observable pour exporter les infos sur la personne connecté
  public currentName = this.loggedUserName.asObservable();
  //Met à jour la clé de l'utilisateur dans la session storage
  private loggedUserId = new BehaviorSubject<number>(NaN);
  public currentId = this.loggedUserId.asObservable();
  public saveUtilisateur(id:number, email: string, prenom: string): void {
    const utilisateur = { "idUser": id,"emailUser": email, "prenom": prenom }
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(utilisateur));
    this.loggedUserName.next(prenom);
    this.loggedUserId.next(id)
  }

  //Permet de récuperer la clé du token dans la session storage et de la stocker dans l'observable
  public getUtilisateur() {
    const utilisateur = sessionStorage.getItem(USER_KEY);
    if (utilisateur) {
      const parsedUser = JSON.parse(utilisateur);
      this.loggedUserName.next(parsedUser.prenom);
      this.loggedUserId.next(parsedUser.idUser);
      return true;
    }
    this.loggedUserName.next("");
    this.loggedUserId.next(NaN);
    return false ;
  }

  //Efface les session storages quand l'utilisateur se deconnecte
  logOut(): void {
    this.loggedUserName.next("");
    this.loggedUserId.next(NaN);
    sessionStorage.removeItem(USER_KEY);
  }
}
