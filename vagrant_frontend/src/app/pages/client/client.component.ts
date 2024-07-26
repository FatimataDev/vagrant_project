import { Component } from '@angular/core';
import {Author} from "../../model/author.interface";
import {Pays} from "../../model/pays.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {PaysService} from "../../services/pays.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";
import {Table} from "primeng/table";
import {Client} from "../../model/client.interface";
import {ClientService} from "../../services/client.service";
import {EmpruntService} from "../../services/emprunt.service";
import {Emprunt} from "../../model/emprunt.interface";
import {Livre} from "../../model/livre.interface";
import {LivreService} from "../../services/livre.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  authors: Client[] = [];
  pays: Pays[] = [];
  authorSelected: Client[] =[];
  author: Client = {};

  emprunts: Emprunt[] = [];
  livres: Livre[] = [];
  selectLivres: Livre[] = [];
  empruntSelected: Emprunt[] =[];
  emprunt: Emprunt = {};
  livre: Livre = {};
  cols?: any[];
  error: any;
  success: any;
  //eventSubscriber: Subscription;

  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  display?: Boolean;
  displayEmprunt?: Boolean;
  //destroy$ = new Subject<boolean> ();
  isSaving?: Boolean;
  displayDelete?: Boolean;
  displayDeleteEmprunt?: Boolean;
  detail?: Boolean;
  blockSpecial = /^[^<>*!%£=+!/$£#@azertyuiopqsdfghjklmwxcvbn,;:]+$/;
  modal = '';
  menuBarBool?: boolean;
  menuitems: any;
  item: any;
  selectedItem: any = null;
  loading: any;
  idClient: number | undefined;
  listLivre: any;
  listLivres: Livre[] = [];
  cnib: string | undefined;
  nom: string | undefined;
  prenom: string | undefined;
  constructor(
    protected authorService: ClientService,
    protected empruntService: EmpruntService,
    protected livreService: LivreService,
    protected activatedRoute: ActivatedRoute,
    protected paysService: PaysService,
    protected router: Router,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService
  ){}
  ngOnInit(): void {
    this.display = false;
    this.displayEmprunt = false;
    this.menuBarBool = false;
    this.loadAll();
    this.loadPays();
    this.loadAllEmprunt();
    this.loadLivre();
  }


  onDisplayDialog(editForm1: NgForm, author?: Client, isDetail?: boolean) {
    if (this.display) {
      this.display = false;
      editForm1.resetForm();
    } else {
      this.display = true;
      this.author = {};
      editForm1.resetForm();
    }
  }

  onDisplayDialogEmprunt(editForm1: NgForm, author?: Emprunt, isDetail?: boolean) {
    if (this.displayEmprunt) {
      this.displayEmprunt = false;
      editForm1.resetForm();
    } else {
      this.displayEmprunt = true;
      this.emprunt = {};
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




  deleteElement(author: Client) {
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
  deleteElementEmprunt(emprunt: Emprunt) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (emprunt === null) {
          return;
        } else {

          if (emprunt.id != null) {
            this.empruntService.deleteAuthor(emprunt.id).subscribe(
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

  onDisplayDialogue(auteur :Client): void {
    this.author = {};
    this.author = auteur;
    this.display = true;
  }

  onDisplayDialogueEmprunt(emprunt :Emprunt): void {
    this.emprunt = {};
    this.emprunt = emprunt;

    this.displayEmprunt = true;
  }


  loadAll(){
    this.authorService.getAllAuthors().subscribe (
      (res) => {
        console.log ('***************vrai***************');
        console.log (res);
        this.authors = res;
        console.log ("emprunteur",res);
      }
    );
  }

  quitter(){
    this.detail = false;
  }

  viewList(emprunt :Emprunt){
    this.detail = true;
    this.idClient = emprunt.client?.id;
    this.nom = emprunt.client?.nom;
    this.cnib = emprunt.client?.cnib;
    this.prenom = emprunt.client?.prenom;
    this.listLivre = emprunt.livres;
    /*this.emprunts.filter(clie => clie.id === emprunt.id);
    console.log("emprunts1",this.emprunts);
    console.log("emprunts1 listLivre",this.listLivre);
     this.emprunts.forEach(liv=>{
       this.listLivre = liv.livres;
    });*/
  }

  loadAllEmprunt(){
    this.empruntService.getAllAuthors().subscribe (
      (res) => {
        console.log ('***************vrai***************');
        console.log (res);
        this.emprunts = res;
        console.log ("EMPRUNT",res);
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

  loadLivre(){
    this.livreService.getAllLivres().subscribe (
      (res) => {
        console.log ('***************vrai***************');
        console.log (res);
        this.livres = res;
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

  annulerEmprunt() {
    this.displayEmprunt = false;
  }
  save(editForm: NgForm) {
    if (!this.ifExist()) {
      this.confirmationService.confirm ({
        header: 'ENREGISTREMENT',
        message: 'Voulez-vous vraiment enregistrer un  emprunteur?',

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

      this.showMessage('error', 'ENREGISTREMENT', 'Un emprunteurr ayant le même CNIB existe déjà !');

    }

  }

  saveEmprunt(editForm1: NgForm) {

    this.emprunt.livres = this.selectLivres;
    console.log("this.emprunt.livres",this.emprunt.livres);
      this.confirmationService.confirm ({
        header: 'ENREGISTREMENT',
        message: 'Voulez-vous vraiment enregistrer un  emprunt?',

        accept: () => {

          if (this.emprunt?.id != null) {
            this.empruntService.updateAuthor(this.emprunt).subscribe(
              () => {
                this.loadAllEmprunt();
                this.showMessage('success', 'Modification', 'Modification effectuée avec succès !');
                this.displayEmprunt = false;

              },

              () => this.showMessage('error', 'Modification', 'Echec de Modification !')

            );
            this.displayEmprunt = false;
          } else {
            this.empruntService.createAuthor(this.emprunt).subscribe(
              () => {
                this.displayEmprunt = false;
                this.loadAllEmprunt();
                this.showMessage('success', 'Ajout', 'Ajout effectué avec succès !');

              },

              () => this.showMessage('error', 'Ajout', 'Echec Ajout !')

            );
            this.loadAllEmprunt();
            this.displayEmprunt = false;
            editForm1.resetForm();
          }

        }
      });

  }

  ifExist(): boolean {
    if (this.author.id) {
      return this.authors.some(
        value =>
          value.id !== this.author.id &&
          value.cnib === this.author.cnib
      );
    } else {
      return this.authors.some(value => value.cnib === this.author.cnib);
    }
  }




  annulerDelete() {
    this.displayDelete = false;
  }

  annulerDeleteEmprunt() {
    this.displayDeleteEmprunt = false;
  }
  supprimer() {
    this.displayDelete = true;
  }

  supprimerEmprunt() {
    this.displayDeleteEmprunt = true;
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

  deleteAllEmprunt() {
    this.empruntSelected.forEach(p=>{
      this.empruntService.deleteAuthor(p.id).subscribe(
        () => {
          this.loadAll();
        },
      );
      this.displayDeleteEmprunt = false;
    });

    this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
