import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ILivre, Livre} from "../model/livre.interface";
export type EntityResponseType = HttpResponse<ILivre>;

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  public resourceUrl = environment.api + 'livres';
  constructor(protected http: HttpClient) {}

  getAllLivres(): Observable<ILivre[]> {
    return this.http.get<ILivre[]>(this.resourceUrl);
  }

  getLivreById(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.resourceUrl}/${id}`);
  }


  createLivre(livre: ILivre): Observable<ILivre> {
    return this.http.post<ILivre>(this.resourceUrl, livre);
  }

  updateLivre(livre: ILivre): Observable<Livre> {
    return this.http.put<Livre>(`${this.resourceUrl}/${livre.id}`, livre);
  }

  deleteLivre(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }

  searchByLivre(titre: string): Observable<any> {
    return this.http.get(`${this.resourceUrl}/search`, { params: { titre } });
  }

  deleteMultiple(ids: any): Observable<void> {
    return this.http.request<void>('delete', `${this.resourceUrl}/delete`, { body: ids });
  }

}
