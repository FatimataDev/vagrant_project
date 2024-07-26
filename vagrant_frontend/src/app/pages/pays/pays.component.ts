import { Component } from '@angular/core';
import {Pays} from "../../model/pays.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";
import {PaysService} from "../../services/pays.service";
import {Table} from "primeng/table";

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent {


  payss: Pays[] = [];
  paysSelected: Pays[] =[];
  cols?: any[];
  error: any;
  success: any;
  //eventSubscriber: Subscription;

  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  pays: Pays = {};
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
  options: any;
  data: any;


  constructor(
    protected paysService: PaysService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService
  ){}
  ngOnInit(): void {
    this.display = false;
    this.menuBarBool = false;
    this.loadAll();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
/*
    this.data = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'My First dataset',
          borderColor: documentStyle.getPropertyValue('--bluegray-400'),
          pointBackgroundColor: documentStyle.getPropertyValue('--bluegray-400'),
          pointBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          borderColor: documentStyle.getPropertyValue('--pink-400'),
          pointBackgroundColor: documentStyle.getPropertyValue('--pink-400'),
          pointBorderColor: documentStyle.getPropertyValue('--pink-400'),
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: documentStyle.getPropertyValue('--pink-400'),
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: textColorSecondary
          },
          pointLabels: {
            color: textColorSecondary
          }
        }
      }
    };*/



  }




  onDisplayDialog(editForm1: NgForm, pays?: Pays, isDetail?: boolean) {
    if (this.display) {
      this.display = false;
      editForm1.resetForm();
    } else {
      this.display = true;
      this.pays = {};
      editForm1.resetForm();
    }
  }

  add(pays1: Pays) {
    if (pays1 === null) {
      this.modal = 'ajouter';
    } else {
      this.pays = pays1;
      this.modal = 'modifier';
    }
    this.display = true;
  }




  deleteElement(pays: Pays) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (pays === null) {
          return;
        } else {

          if (pays.id != null) {
            this.paysService.deletePays(pays.id).subscribe(
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

  onDisplayDialogue(pays :Pays): void {
    this.pays = pays;
    console.log("payss",this.pays);
    this.display = true;
  }


  loadAll(){

    this.paysService.getAllPayss().subscribe (
      (res) => {
        console.log ('***************vrai***************');
        console.log (res);
        this.payss = res
      });
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
        message: 'Voulez-vous vraiment enregistrer un  pays?',

        accept: () => {

          if (this.pays?.id != null) {
            this.paysService.updatePays(this.pays).subscribe(
              () => {
                this.loadAll();
                this.showMessage('success', 'Modification', 'Modification effectuée avec succès !');
                this.display = false;

              },

              () => this.showMessage('error', 'Modification', 'Echec de Modification !')

            );
            this.display = false;
          } else {
            this.paysService.createPays(this.pays).subscribe(
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

      this.showMessage('error', 'ENREGISTREMENT', 'Un pays portant le même nom existe déjà !');

    }

  }

  ifExist(): boolean {
    if (this.pays.id) {
      return this.payss.some(
        value =>
          value.id !== this.pays.id &&
          value.nomPays === this.pays.nomPays
      );
    } else {
      return this.payss.some(value => value.nomPays === this.pays.nomPays);
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
  onClickMenu(pays: Pays) {
    this.menuitems = [];
    {
      this.menuitems.push({
        label: 'Modifier',
        icon: 'pi pi-pencil',
        command: (event: any) => {
          this.add(pays);
          console.log("new acteur",pays);

        }
      });

      this.menuitems.push({
        label: 'Supprimer',
        icon: 'pi pi-trash',
        command: (event: any) => {
          this.deleteElement(pays);
        }
      });


    }
  }

  deleteAll() {
    this.paysSelected.forEach(p=>{
      this.paysService.deletePays(p.id).subscribe(
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
