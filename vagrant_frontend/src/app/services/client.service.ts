import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Author, IAuthor} from '../model/author.interface';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Client, IClient} from "../model/client.interface";
export type EntityResponseType = HttpResponse<IAuthor>;

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public resourceUrl = environment.api + 'clients';
  constructor(protected http: HttpClient) {}

  getAllAuthors(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.resourceUrl);
  }


  createAuthor(author: IClient): Observable<IClient> {
    return this.http.post<IClient>(this.resourceUrl, author);
  }

  updateAuthor(author: IClient): Observable<Client> {
    return this.http.put<Client>(`${this.resourceUrl}/${author.id}`, author);
  }

  deleteAuthor(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }

  deleteMultiple(ids: any): Observable<void> {
    return this.http.request<void>('delete', `${this.resourceUrl}/delete`, { body: ids });
  }



}
