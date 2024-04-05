import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PictureManagementService {
  urlApiRandomPicture = environment.urlApiRandomPicture
  constructor(private readonly http: HttpClient) { }

  //Appel l'API pour recuperer l'URL d'une image de façon aléatoire
  getURLfromAPI(dimensions: number[]) {
    return this.http.get(`${this.urlApiRandomPicture}image?width=${dimensions[0]}&height=${dimensions[1]}&category=buildings&format=text`, { responseType: "text" })
  }
}
