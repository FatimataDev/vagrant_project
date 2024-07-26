import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {IAuthor} from '../model/author.interface';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Emprunt, IEmprunt} from "../model/emprunt.interface";
export type EntityResponseType = HttpResponse<IAuthor>;

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {
  public resourceUrl = environment.api + 'emprunts';
  constructor(protected http: HttpClient) {}

  getAllAuthors(): Observable<IEmprunt[]> {
    return this.http.get<IEmprunt[]>(this.resourceUrl);
  }


  createAuthor(author: IAuthor): Observable<IEmprunt> {
    return this.http.post<IEmprunt>(this.resourceUrl, author);
  }

  updateAuthor(author: IEmprunt): Observable<Emprunt> {
    return this.http.put<Emprunt>(`${this.resourceUrl}/${author.id}`, author);
  }

  deleteAuthor(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }

  deleteMultiple(ids: any): Observable<void> {
    return this.http.request<void>('delete', `${this.resourceUrl}/delete`, { body: ids });
  }



}
