import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
declare let bootstrap: any;
@Injectable({
  providedIn: 'root'
})
export class MessageManagementService {
  private urlApiErrorMessages = environment.urlApiErrorMessages;
constructor(private http: HttpClient) { }
//Récuperation des messages d'erreur
getErrorMessages():Observable<string[]>{
  return this.http.get<string[]>(this.urlApiErrorMessages)
    }
  
    //Méthode Javascript pour afficher les tooltips Bootstrap.
    tooltipBootstrap() {
      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
      })
    }
}
