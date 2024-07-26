export interface IGenre {
  id?: number,
  libelle?: string

}

export class Genre implements IGenre{
  constructor(
    public id?: number,
    public libelle?: string


  ){

  }
}


