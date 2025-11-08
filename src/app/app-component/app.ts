import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

const menuOptions = [
  { label: 'Home', path: '' },
  { label: 'Gangs', path: '/gangs' },
];

@Component({
  imports: [
    MatSidenavModule,
    MatToolbar,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  menuOptions = menuOptions;
}
