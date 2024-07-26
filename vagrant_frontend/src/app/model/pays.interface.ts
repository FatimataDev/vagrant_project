export interface IPays {
  id?: number,
  nomPays?: string

}

export class Pays implements IPays{
  constructor(
    public id?: number,
    public nomPays?: string


  ){

  }
}


