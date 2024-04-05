import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { Breadcrumb } from './shared/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    // Définit la hiérarchie et la fin de la route pour le fil d'ariane
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(_event => {
      const racineFil = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.ajouterBreadcrumb(racineFil, [], breadcrumbs);
      this._breadcrumbs$.next(breadcrumbs);
    });
  }


  //Permet de construire le fil d'Ariane à partir des données récupérés depuis l'URL
  obtenirLabelURL(data: Data) {
    return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb'];
  }

  //Construit la nouvelle URL avec les labels renvoyé depuis le routage
  ajouterBreadcrumb(route: ActivatedRouteSnapshot | null, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));
      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: this.obtenirLabelURL(route.data),
          url: '/' + routeUrl.join('/')
        };
        breadcrumbs.push(breadcrumb);
      }
      this.ajouterBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }
}
