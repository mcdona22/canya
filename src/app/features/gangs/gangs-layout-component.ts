import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CanyaDetailStore } from './canya-detail-store';

@Component({
  selector: 'app-gangs-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [CanyaDetailStore],
  template: '<router-outlet></router-outlet>',
})
export class GangsLayoutComponent implements OnInit {
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(`initialising the store`, id);
    this.store.init(id);
  }

  private route = inject(ActivatedRoute);
  store = inject(CanyaDetailStore);
}
