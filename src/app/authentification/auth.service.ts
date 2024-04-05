import { TokenService } from 'src/app/token.service';
import { Email } from './../interfaces/email';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compte } from '../models/compte';
import { Router } from "@angular/router";
import { LoggedUser } from '../interfaces/loggedUser';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi = environment.urlApi;
  private urlApiCheckDisposableMail = environment.urlApiCheckDisposableMail;
  constructor(private http: HttpClient,
    private readonly route: Router,
    private readonly tokenStorage: TokenService) { }

  //Appele le back local pour poster une entrée du formulaire.
  saveAccount(compte: Compte): Observable<Compte[]> {
    let body = {
      'last_name': compte.nomFamille.toUpperCase(),
      'first_name': compte.prenom,
      'e-mail': compte.email,
      'birthdate': compte.dateNaissance,
      'password': compte.password,
      'option': compte.option
    };
    return this.http.post<Compte[]>(this.urlApi, body)
  }

  //Cette méthode va vérifier si l'adresse est un mail jetable ou non
  checkIfDisposableMail(): Observable<string[]> {
    return this.http.get<string[]>(this.urlApiCheckDisposableMail)
  }

  //Permet de recuperer les infos que l'utilisateur a entrée pour s'authentifier afin de mettre a jour la USER_KEY .
  logInUser(email: string, password: string) {
    this.http.get<LoggedUser[]>(this.urlApi).pipe(map((tabJson: LoggedUser[]) => {
      return tabJson.map((data: any) => {
        return {
          idUsuer: data["id"],
          emailUser: data["e-mail"],
          passwordUser: data["password"],
          prenomUser: data["first_name"]
        }
      })
    })).subscribe(resultatCompte => {
      const user = resultatCompte.find((ligneCompte: LoggedUser) => {
        return ligneCompte.emailUser === email && ligneCompte.passwordUser === password;
      });
      if (user) {
        this.tokenStorage.saveUtilisateur(user.idUsuer, user.emailUser, user.prenomUser);
        this.route.navigate(["accueil"]);
      }
      else {
        this.erreurBack();
      }
    }, (error) => {
      console.log("error: " + error)
      this.erreurBack();
    })
  }

  //redige vers la page d'accueil au moment de la deconnexion
  logOutUser(){
    this.route.navigate(["accueil"]);
  }

  //Appele le back local pour obtenir la liste des adresses mail
  getAllEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(this.urlApi)
      .pipe(
        map((tabJson: Email[]) => {
          return tabJson.map((data: any) => {
            return {
              email: data["e-mail"]
            }
          })
        })
      );
  }

  //On route l'application vers la page 404 en cas d'erreur de l'API
  erreurBack() {
    this.route.navigate(["auth/echec"]);
  }

 //Recupère la liste des utilisateurs enregistrés
  getUsers(): Observable<Compte[]> {
    return this.http.get<Compte[]>(this.urlApi).pipe(
      map((tabJson: Compte[]) => {
        return tabJson.map((data: any) => {
          return {
            id: data["id"],
            nomFamille: data["last_name"],
            prenom: data["first_name"],
            dateNaissance: data["birthdate"],
            email: data["e-mail"],
            password: data["password"],
            option: data["option"],
          }
        })
      })
    )
  }

  onClickDisconnectButton() {
    Swal.fire({
      icon: 'warning',
      title: 'Déconnexion',
      text: 'Vous allez être déconnecté du service. Êtes-vous certain de vouloir vous déconnecter ?',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    })
      .then((choix: { isConfirmed: boolean; }) => {
        if (choix.isConfirmed) {
          this.tokenStorage.logOut();
          this.logOutUser();
        }
      })
  }
}
