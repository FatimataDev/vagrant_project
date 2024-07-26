import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Author, IAuthor} from '../model/author.interface';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
export type EntityResponseType = HttpResponse<IAuthor>;

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  public resourceUrl = environment.api + 'auteurs';
  constructor(protected http: HttpClient) {}

  getAllAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(this.resourceUrl);
  }


  createAuthor(author: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(this.resourceUrl, author);
  }

  updateAuthor(author: IAuthor): Observable<Author> {
    return this.http.put<Author>(`${this.resourceUrl}/${author.id}`, author);
  }

  deleteAuthor(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }

  deleteMultiple(ids: any): Observable<void> {
    return this.http.request<void>('delete', `${this.resourceUrl}/delete`, { body: ids });
  }



}
