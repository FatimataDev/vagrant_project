import { Component } from '@angular/core';
import {Genre} from "../../model/genre.interface";
import {GenreService} from "../../services/genre.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent {


  genres: Genre[] = [];
  genreSelected: Genre[] =[];
  cols?: any[];
  error: any;
  success: any;
  //eventSubscriber: Subscription;

  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  genre: Genre = {};
  display?: Boolean;
  //destroy$ = new Subject<boolean> ();
  isSaving?: Boolean;
  displayDelete?: Boolean;
  blockSpecial = /^[^<>*!%£=+!/$£#@azertyuiopqsdfghjklmwxcvbn,;:]+$/;
  modal = '';
  menuBarBool?: boolean;
  menuitems: any;
  item: any;
  selectedItem: any = null;
  loading: any;
  constructor(
    protected genreService: GenreService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService
  ){}
  ngOnInit(): void {
    this.display = false;
    this.menuBarBool = false;
    this.loadAll();
  }


  onDisplayDialog(editForm1: NgForm, genre?: Genre, isDetail?: boolean) {
    if (this.display) {
      this.display = false;
      editForm1.resetForm();
    } else {
      this.display = true;
      this.genre = {};
      editForm1.resetForm();
    }
  }

  add(genre1: Genre) {
    if (genre1 === null) {
      this.modal = 'ajouter';
    } else {
      this.genre = genre1;
      this.modal = 'modifier';
    }
    this.display = true;
  }




  deleteElement(genre: Genre) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (genre === null) {
          return;
        } else {

          if (genre.id != null) {
            this.genreService.deleteGenre(genre.id).subscribe(
              () => {
                this.loadAll();
                this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
              },
              error => {
                error.message;
                window.console.log("error",error.message);

                this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression!')
              }
            );
          }
        }
      }
    });
  }

  onDisplayDialogue(auteur :Genre): void {
    this.genre = auteur;
    this.display = true;
  }


  loadAll(){
    this.genreService.getAllGenres().subscribe (
      (res) => {
        console.log ('***************vrai***************');
        console.log (res);
        this.genres = res;
      }
    );
  }

  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  annuler() {
    this.display = false;
  }
  save(editForm: NgForm) {
    if (!this.ifExist()) {
      this.confirmationService.confirm ({
        header: 'ENREGISTREMENT',
        message: 'Voulez-vous vraiment enregistrer un  genre?',

        accept: () => {

          if (this.genre?.id != null) {
            this.genreService.updateGenre(this.genre).subscribe(
              () => {
                this.loadAll();
                this.showMessage('success', 'Modification', 'Modification effectuée avec succès !');
                this.display = false;

              },

              () => this.showMessage('error', 'Modification', 'Echec de Modification !')

            );
            this.display = false;
          } else {
            this.genreService.createGenre(this.genre).subscribe(
              () => {
                this.loadAll();
                this.showMessage('success', 'Ajout', 'Ajout effectué avec succès !');
                this.display = false;
              },

              () => this.showMessage('error', 'Ajout', 'Echec Ajout !')

            );
            this.loadAll();
            this.display = false;
            editForm.resetForm();
          }

        }
      });

    }else {

      this.showMessage('error', 'ENREGISTREMENT', 'Un genre portant le même nom existe déjà !');

    }

  }

  ifExist(): boolean {
    if (this.genre.id) {
      return this.genres.some(
        value =>
          value.id !== this.genre.id &&
          value.libelle === this.genre.libelle
      );
    } else {
      return this.genres.some(value => value.libelle === this.genre.libelle);
    }
  }




  annulerDelete() {
    this.displayDelete = false;
  }
  supprimer() {
    this.displayDelete = true;
  }


  ngOnDestroy(): void {
    //this.destroy$.next (true);
    // this.destroy$.unsubscribe ();
  }

  menuBar() {
    this.menuBarBool = true;
  }
  onClickMenu(genre: Genre) {
    this.menuitems = [];
    {
      this.menuitems.push({
        label: 'Modifier',
        icon: 'pi pi-pencil',
        command: (event: any) => {
          this.add(genre);
          console.log("new acteur",genre);

        }
      });

      this.menuitems.push({
        label: 'Supprimer',
        icon: 'pi pi-trash',
        command: (event: any) => {
          this.deleteElement(genre);
        }
      });


    }
  }

  deleteAll() {
    this.genreSelected.forEach(p=>{
      this.genreService.deleteGenre(p.id).subscribe(
        () => {
          this.loadAll();
        },
      );
      this.displayDelete = false;
    });

    this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');

  }

}
