import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthButton } from '../features/auth/presentation/auth-button/auth-button';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { canyasBasePath } from '../routing/app-routes';

const menuOptions = [
  { label: 'Home', path: '', tag: 'landing' },
  { label: 'Gangs', path: '/gangs', tag: 'gangs' },
  {
    label: 'Canyas',
    path: `/${canyasBasePath}`,
    tag: 'Canyas',
  },
];

@Component({
  imports: [
    MatSidenavModule,
    MatToolbar,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AuthButton,
    MatIconButton,
    MatIcon,
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  menuOptions = menuOptions;
  sideNavOpen = signal(false);

  toggleSideNav() {
    this.sideNavOpen.set(!this.sideNavOpen());
  }

  sideNavClose() {
    this.sideNavOpen.set(false);
  }

  onSideNavClosed() {
    this.sideNavOpen.set(false);
  }
}
