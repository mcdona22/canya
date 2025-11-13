import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { canyasBasePath } from '../../../../routing/app-routes';

@Component({
  selector: 'app-canya-landing',
  imports: [MatButtonModule],
  templateUrl: './canya-landing.html',
  styleUrl: './canya-landing.scss',
})
export class CanyaLanding {
  router = inject(Router);

  onNewClick() {
    const path = `/${canyasBasePath}/new`;
    console.log(`New Canya navigation`, path);
    this.router.navigateByUrl(path).then();
  }
}
