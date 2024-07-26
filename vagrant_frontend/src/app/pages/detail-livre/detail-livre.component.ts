import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CatService} from "../../services/cat/cat.service";
import {LivreService} from "../../services/livre.service";

@Component({
  selector: 'app-detail-livre',
  templateUrl: './detail-livre.component.html',
  styleUrls: ['./detail-livre.component.css']
})
export class DetailLivreComponent {

  livre: any;

  constructor(
    private route: ActivatedRoute,
    private catService: CatService,
    private livreService: LivreService
  ) { }

  ngOnInit(): void {
    this.livre = {
      name: ''
    };

    let id  = this.route.snapshot.params['id'];

    this.livreService.getLivreById(id).subscribe( data => {
      this.livre = data

    });
  }
}

