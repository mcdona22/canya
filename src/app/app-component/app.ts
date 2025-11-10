import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthButton } from '../features/auth/presentation/auth-button/auth-button';

const menuOptions = [
  { label: 'Home', path: '', tag: 'landing' },
  { label: 'Gangs', path: '/gangs', tag: 'gangs' },
];

@Component({
  imports: [
    MatSidenavModule,
    MatToolbar,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AuthButton,
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  menuOptions = menuOptions;
}
