import { Component } from '@angular/core';
import {LivreService} from "../../services/livre.service";
import {Livre} from "../../model/livre.interface";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {

  livres: Livre[] = [];


  constructor(
    protected livreService: LivreService,

  ){}
  ngOnInit(): void {
    this.loadAll();
  }


  loadAll(){
    this.livreService.getAllLivres().subscribe (
      (res) => {
        console.log ('***************vrai***************');
        console.log (res);
        this.livres = res;
      }
    );
  }

}
