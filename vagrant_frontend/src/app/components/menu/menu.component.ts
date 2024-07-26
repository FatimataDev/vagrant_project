import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItem } from 'src/app/model/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent {
  constructor(private _sanitizer: DomSanitizer) {}

  @Output() offsetMenuEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() offsetMenu = false;

  onMenu(val: boolean) {
    this.offsetMenuEvent.emit(val);
  }

  sideMenu: MenuItem[] = [
    {
      label: 'Accueil',
      url: '',
      icon: `<svg class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>`,
      title: 'Initial Page'
    },
    {
      label: 'Pays',
      url: '/pays',
      icon: `<svg class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 4.5V7H4.5m15 0H15V4.5m0 15V15h4.5M4.5 9H7v6H4.5m15-6H15v6h4.5M9 9v6m0-6h6v6H9V9z" />
      </svg>`,
      title: 'Check all Cat Breeds'
    },
    {
      label: 'Genre littéraire',
      url: '/genre',
      icon: `<svg class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1118 0 9 9 0 01-18 0zm12 0H9"/>
      </svg>`,
      title: 'Check all Cat Breeds'
    },
    {
      label: 'Auteur',
      url: '/author',
      icon: `<svg class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A4.5 4.5 0 119.97 9.97m0 0a4.5 4.5 0 014.242 4.242m0 0a8.455 8.455 0 015.737 2.392m0 0A8.455 8.455 0 0112 20.5a8.455 8.455 0 01-6.879-2.696z" />
      </svg>`,
      title: 'Check all Cat Breeds'
    },
    {
      label: 'Livre',
      url: '/livre',
      icon: `<svg class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>`,
      title: 'Check all Cat Breeds'
    },
    {
      label: 'Nos livres',
      url: '/liste',
      icon: `<svg class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>`,
      title: 'Check all Cat Breeds'
    },
    /*{
      label: 'Most Searched',
      url: '/most-searched',
      icon: `<svg class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>`,
      title: 'Top 10 most searched'
    }*/
  ];

  getSVGImage(image: any) {
    return this._sanitizer.bypassSecurityTrustHtml(`${image}`);
  }
}
