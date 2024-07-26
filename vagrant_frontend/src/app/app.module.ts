import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';

import { LatestCatsModule } from './components/latest-cats/latest-cats.module';
import {ConfirmationService, MessageService, PrimeIcons} from "primeng/api";
import {TableModule} from "primeng/table";
import {BrowserModule} from "@angular/platform-browser";
import {ToastModule} from "primeng/toast";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputMaskModule} from "primeng/inputmask";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";
import {StepsModule} from "primeng/steps";
import {TreeSelectModule} from "primeng/treeselect";
import {SlideMenuModule} from "primeng/slidemenu";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { LivresComponent } from './pages/livres/livres.component';
import { ListeComponent } from './pages/liste/liste.component';
import { AuteurComponent } from './pages/auteur/auteur.component';
import { DetailLivreComponent } from './pages/detail-livre/detail-livre.component';
import { GenreComponent } from './pages/genre/genre.component';
import { PaysComponent } from './pages/pays/pays.component';
import {ChartModule} from "primeng/chart";
import { ClientComponent } from './pages/client/client.component';
import {TabPanel, TabView, TabViewModule} from "primeng/tabview";
import {MultiSelectModule} from "primeng/multiselect";
import {TabMenuModule} from "primeng/tabmenu";

// noinspection AngularInvalidImportedOrDeclaredSymbol
@NgModule({
  declarations: [
    AppComponent,
    LivresComponent,
    ListeComponent,
    AuteurComponent,
    DetailLivreComponent,
    GenreComponent,
    PaysComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    LatestCatsModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    TableModule,
    RadioButtonModule,
    InputMaskModule,
    DropdownModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    ToolbarModule,
    InputTextModule,
    StepsModule,
    TreeSelectModule,
    SlideMenuModule,
    ConfirmDialogModule,
    ChartModule,
    TabViewModule,
    MultiSelectModule,
    TabMenuModule

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
