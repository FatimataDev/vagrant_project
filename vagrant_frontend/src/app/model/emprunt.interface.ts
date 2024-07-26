import {Client} from "./client.interface";
import {Livre} from "./livre.interface";

export interface IEmprunt {
  id?: number,
  date?: string,
  client?: Client,
  livres?: Livre[],
  titre? :string,
  ean? : string;

}

export class Emprunt implements IEmprunt{
  constructor(
    public id?: number,
    public date?: string,
    public client?: Client,
    public livres?: Livre[],
    public titre? :string,
    public ean? : string


  ){

  }
}


