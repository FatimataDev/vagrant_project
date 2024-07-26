import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Author} from '../model/author.interface';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ILivre} from "../model/livre.interface";
import {IPays, Pays} from "../model/pays.interface";
export type EntityResponseType = HttpResponse<ILivre>;

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  public resourceUrl = environment.api + 'pays';
  constructor(protected http: HttpClient) {}

  getAllPayss(): Observable<IPays[]> {
    return this.http.get<IPays[]>(this.resourceUrl);
  }

  getPaysById(id: number): Observable<Pays> {
    return this.http.get<Pays>(`${this.resourceUrl}/${id}`);
  }


  createPays(livre: IPays): Observable<IPays> {
    return this.http.post<IPays>(this.resourceUrl, livre);
  }

  updatePays(livre: IPays): Observable<Pays> {
    return this.http.put<Author>(`${this.resourceUrl}/${livre.id}`, livre);
  }

  deletePays(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }

  searchByPays(titre: string): Observable<any> {
    return this.http.get(`${this.resourceUrl}/search`, { params: { titre } });
  }



  deleteMultiple(params?: number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/delete`, { body: params });
  }



}
