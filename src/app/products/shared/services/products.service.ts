import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly urlApiArticleList = environment.urlApiArticleList;
  constructor(private readonly http: HttpClient) { }
  //Recupère la liste des articles enregistrés
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlApiArticleList)
  }

  //Recupère la liste d'un article
  getProductByID(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.urlApiArticleList}/${id}`)
  }
}