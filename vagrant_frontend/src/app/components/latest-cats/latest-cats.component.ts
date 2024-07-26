import { Component, OnInit, Input } from '@angular/core';
import { CatService } from 'src/app/services/cat/cat.service';
import {Livre} from "../../model/livre.interface";
import {LivreService} from "../../services/livre.service";

@Component({
  selector: 'app-latest-cats',
  templateUrl: './latest-cats.component.html'
})

export class LatestCatsComponent implements OnInit {
  cats: any;
  name: string = '';
  showLoader: boolean = true;
  livres: Livre[] = [];

  @Input() limit = 1;

  constructor(private catService:CatService,
              private livreService: LivreService) { }

  ngOnInit(): void {
    this.showLoader = true;

  /*  this.catService.getCats(this.limit).subscribe(data=>{
        this.cats = data;
        this.showLoader = false;
    });*/




      this.livreService.getAllLivres().subscribe (
        (res) => {
          console.log ('***************vrai***************');
          console.log (res);
          this.livres = res;
          this.showLoader = false;
        }
      );

  }
}
