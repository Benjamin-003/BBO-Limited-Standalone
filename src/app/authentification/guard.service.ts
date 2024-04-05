import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private tokenService: TokenService, private route: Router) { }
  canActivate(): true|UrlTree {
    if (this.tokenService.getUtilisateur()) {
      return true
    }
    else {
      return this.route.parseUrl("accueil")
    }
  }
}
