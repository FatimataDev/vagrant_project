import { Component } from '@angular/core';
import {Livre} from "../../model/livre.interface";
import {LivreService} from "../../services/livre.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";
import {AuthorService} from "../../services/author.service";
import {Author} from "../../model/author.interface";
import {GenreService} from "../../services/genre.service";
import {Genre} from "../../model/genre.interface";
import {Table} from "primeng/table";
import {PaysService} from "../../services/pays.service";
import {Pays} from "../../model/pays.interface";

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent {

  livres: Livre[] = [];
  genres: Genre[] = [];
  pays: Pays[] = [];
  livreSelected: Livre[] =[];
  cols?: any[];
  authors: Author[]=[];
  error: any;
  success: any;
  //eventSubscriber: Subscription;

  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  livre: Livre = {};
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
  selectedFile: File | null = null;
  imagePreview?: string | ArrayBuffer | null ;
  loading: any;
  selectAuteur : Author | undefined;
  constructor(
    protected livreService: LivreService,
    protected authorService: AuthorService,
    protected paysService: PaysService,
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
    this.loadAuteur();
    this.loadGenre();
    this.loadPays();
  }

  loadPays(){
    this.paysService.getAllPayss().subscribe (
      (res) => {
        console.log ('***************vrai***************');
        console.log (res);
        this.pays = res;
      }
    );
  }


  onDisplayDialog(editForm1: NgForm, livre?: Livre, isDetail?: boolean) {
    if (this.display) {
      this.display = false;
      editForm1.resetForm();
    } else {
      this.display = true;
      this.livre = {};
      editForm1.resetForm();
    }
  }

  loadAuteur(){
    this.authorService.getAllAuthors().subscribe (
      (res) => {
        console.log ('***************vrai***************');
        console.log (res);
        this.authors = res;
      }
    );
  }



  loadGenre(){
    this.genreService.getAllGenres().subscribe (
      (res) => {
        console.log ('***************vrai***************');
        console.log (res);
        this.genres = res;
      }
    );
  }

  add(livre1: Livre) {
    if (livre1 === null) {
      this.modal = 'ajouter';
    } else {
      this.livre = livre1;
      this.modal = 'modifier';
      this.livre.photo = this.imagePreview;
     this.selectAuteur = this.authors.find(auteu=>auteu.id == livre1.auteur!.id)
    }
    this.display = true;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }









  deleteElement(livre: Livre) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (livre === null) {
          return;
        } else {

          if (livre.id != null) {
            this.livreService.deleteLivre(livre.id).subscribe(
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


  loadAll(){
    this.livreService.getAllLivres().subscribe (
      (res) => {
        console.log ('***************vrai***************');
        console.log (res);
        this.livres = res;
        console.log("livre",this.livres);
      }
    );
  }

  onDisplayDialogue(livre :Livre) {
    this.livre = livre;
    this.display = true;
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

    /*const formData: Livre = this.livre;
    if (this.imagePreview) {
      formData.photo = this.imagePreview as string;
    }*/


    this.livre.photo = this.imagePreview;
   // this.livre.auteur = this.selectAuteur;

    if (!this.ifExist()) {
      this.confirmationService.confirm ({
        header: 'ENREGISTREMENT',
        message: 'Voulez-vous vraiment enregistrer un livre',

        accept: () => {

          if (this.livre?.id != null) {
            this.livreService.updateLivre(this.livre).subscribe(
              () => {
                this.loadAll();
                this.showMessage('success', 'Modification', 'Modification effectuée avec succès !');
                this.display = false;

              },

              () => this.showMessage('error', 'Modification', 'Echec de Modification !')

            );
            this.display = false;
          } else {
            this.livreService.createLivre(this.livre).subscribe(
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

      this.showMessage('error', 'ENREGISTREMENT', 'Un livre portant le même titre existe déjà !');

    }

  }

  ifExist(): boolean {
    if (this.livre.id) {
      return this.livres.some(
        value =>
          value.id !== this.livre.id &&
          value.titre === this.livre.titre
      );
    } else {
      return this.livres.some(value => value.titre === this.livre.titre);
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
  onClickMenu(livre: Livre) {
    this.menuitems = [];
    {
      this.menuitems.push({
        label: 'Modifier',
        icon: 'pi pi-pencil',
        command: (event: any) => {
          this.add(livre);
          console.log("new acteur",livre);

        }
      });

      this.menuitems.push({
        label: 'Supprimer',
        icon: 'pi pi-trash',
        command: (event: any) => {
          this.deleteElement(livre);
        }
      });


    }
  }

  deleteAll() {
    this.livreSelected.forEach(p=>{
      this.livreService.deleteLivre(p.id).subscribe(
        () => {
          this.loadAll();
        },
      );
      this.displayDelete = false;
    });

    this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
