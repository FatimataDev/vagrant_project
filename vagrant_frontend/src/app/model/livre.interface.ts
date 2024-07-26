import {Author} from "./author.interface";
import {Genre} from "./genre.interface";
import {Pays} from "./pays.interface";

export interface ILivre {
  id?: number,
  titre?: string;
  resume?: string;
  ean?: string;
  edition?: string;
  photo?: any;
  annee?: string;
  auteur?: Author;
  genre?:Genre
  pays?: Pays

}

export class Livre implements ILivre{
  constructor(
    public id?: number,
    public titre?: string,
  public resume?: string,
  public ean?: string,
  public edition?: string,
  public photo?: any,
  public annee?: string,
  public auteur?: Author,
  public genre?: Genre,
  public pays?: Pays,


  ){

  }
}
