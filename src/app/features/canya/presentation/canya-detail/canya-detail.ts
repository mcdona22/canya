import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-canya-detail',
  imports: [JsonPipe],
  templateUrl: './canya-detail.html',
  styleUrl: './canya-detail.scss',
})
export class CanyaDetail {
  activatedRoute = inject(ActivatedRoute);
  canya$ = this.activatedRoute.data.pipe(map((data) => data['canya']));
  canya = toSignal(this.canya$, { initialValue: null });
}
