import {Livre} from "./livre.interface";

export interface IClient {
  id?: number,
  nom?: string
  cnib?: string,
  prenom?: string,
  livres?:Livre[]

}

export class Client implements IClient{
  constructor(
    public id?: number,
    public nom?: string,
    public cnib?: string,
    public prenom?: string,
    public livres?: Livre[],


  ){

  }
}


