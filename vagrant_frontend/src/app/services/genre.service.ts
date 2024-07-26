import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Author} from '../model/author.interface';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ILivre, Livre} from "../model/livre.interface";
import {Genre, IGenre} from "../model/genre.interface";
export type EntityResponseType = HttpResponse<ILivre>;

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  public resourceUrl = environment.api + 'genres';
  constructor(protected http: HttpClient) {}

  getAllGenres(): Observable<IGenre[]> {
    return this.http.get<IGenre[]>(this.resourceUrl);
  }

  getGenreById(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.resourceUrl}/${id}`);
  }


  createGenre(livre: IGenre): Observable<IGenre> {
    return this.http.post<IGenre>(this.resourceUrl, livre);
  }

  updateGenre(livre: IGenre): Observable<Genre> {
    return this.http.put<Author>(`${this.resourceUrl}/${livre.id}`, livre);
  }

  deleteGenre(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }

  searchByGenre(titre: string): Observable<any> {
    return this.http.get(`${this.resourceUrl}/search`, { params: { titre } });
  }

  deleteMultiple(ids: any): Observable<void> {
    return this.http.request<void>('delete', `${this.resourceUrl}/delete`, { body: ids });
  }

}
