import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import {LivresComponent} from "./pages/livres/livres.component";
import {ListeComponent} from "./pages/liste/liste.component";
import {AuteurComponent} from "./pages/auteur/auteur.component";
import {DetailLivreComponent} from "./pages/detail-livre/detail-livre.component";
import {PaysComponent} from "./pages/pays/pays.component";
import {GenreComponent} from "./pages/genre/genre.component";
import {ClientComponent} from "./pages/client/client.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule),
  },

  {
    path: 'breed-list',
    loadChildren: () => import('./pages/breed-list/breed-list.module').then((m) => m.BreedListPageModule),
  },
  {
    path: 'most-searched',
    loadChildren: () => import('./pages/most-searched/most-searched.module').then((m) => m.MostSearchedPageModule),
  },
  {
    path: 'cats/:id',
    loadChildren: () => import('./pages/cats/cats.module').then((m) => m.CatsModule),
  },
  {
    path: 'author',
    component: AuteurComponent
  },
  {
    path: 'livre',
    component: LivresComponent
  },
  {
    path: 'liste',
    component: ListeComponent
  },
  {
    path: 'pays',
    component: PaysComponent
  },
  {
    path: 'genre',
    component: GenreComponent
  },
  {
    path: 'client',
    component: ClientComponent
  },
  {
    path: 'detail/:id',
    component: DetailLivreComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
