import { Component } from '@angular/core';
import {Author} from "../../model/author.interface";
import {AuthorService} from "../../services/author.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";
import {Livre} from "../../model/livre.interface";
import {Pays} from "../../model/pays.interface";
import {PaysService} from "../../services/pays.service";
import {Table} from "primeng/table";

@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: ['./auteur.component.css']
})
export class AuteurComponent {



  authors: Author[] = [];
  pays: Pays[] = [];
  authorSelected: Author[] =[];
  cols?: any[];
  error: any;
  success: any;
  //eventSubscriber: Subscription;

  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  author: Author = {};
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
    protected authorService: AuthorService,
    protected activatedRoute: ActivatedRoute,
    protected paysService: PaysService,
    protected router: Router,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService
  ){}
  ngOnInit(): void {
    this.display = false;
    this.menuBarBool = false;
    this.loadAll();
    this.loadPays();
  }


  onDisplayDialog(editForm1: NgForm, author?: Author, isDetail?: boolean) {
    if (this.display) {
      this.display = false;
      editForm1.resetForm();
    } else {
      this.display = true;
      this.author = {};
      editForm1.resetForm();
    }
  }

  add(author1: Author) {
    if (author1 === null) {
      this.modal = 'ajouter';
    } else {
      this.author = author1;
      this.modal = 'modifier';
    }
    this.display = true;
  }




  deleteElement(author: Author) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (author === null) {
          return;
        } else {

          if (author.id != null) {
            this.authorService.deleteAuthor(author.id).subscribe(
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

  onDisplayDialogue(auteur :Author): void {
    this.author = {};
    this.author = auteur;
    this.display = true;
  }


  loadAll(){
    this.authorService.getAllAuthors().subscribe (
      (res) => {
        console.log ('***************vrai***************');
        console.log (res);
        this.authors = res;
      }
    );
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
        message: 'Voulez-vous vraiment enregistrer un  auteur?',

        accept: () => {

          if (this.author?.id != null) {
            this.authorService.updateAuthor(this.author).subscribe(
              () => {
                this.loadAll();
                this.showMessage('success', 'Modification', 'Modification effectuée avec succès !');
                this.display = false;

              },

              () => this.showMessage('error', 'Modification', 'Echec de Modification !')

            );
            this.display = false;
          } else {
            this.authorService.createAuthor(this.author).subscribe(
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

      this.showMessage('error', 'ENREGISTREMENT', 'Un auteur portant le même nom existe déjà !');

    }

  }

  ifExist(): boolean {
    if (this.author.id) {
      return this.authors.some(
        value =>
          value.id !== this.author.id &&
          value.nom === this.author.nom
      );
    } else {
      return this.authors.some(value => value.nom === this.author.nom);
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
  onClickMenu(author: Author) {
    this.menuitems = [];
    {
      this.menuitems.push({
        label: 'Modifier',
        icon: 'pi pi-pencil',
        command: (event: any) => {
          this.add(author);
          console.log("new acteur",author);

        }
      });

      this.menuitems.push({
        label: 'Supprimer',
        icon: 'pi pi-trash',
        command: (event: any) => {
          this.deleteElement(author);
        }
      });


    }
  }

  deleteAll() {
    this.authorSelected.forEach(p=>{
      this.authorService.deleteAuthor(p.id).subscribe(
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
