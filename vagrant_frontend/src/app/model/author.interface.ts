import {Pays} from "./pays.interface";

export interface IAuthor {
  id?: number,
  nom?: string
  pays?: Pays

}

export class Author implements IAuthor{
  constructor(
    public id?: number,
    public nom?: string,
    public pays?: Pays,


  ){

  }
}


