import { Component, input } from '@angular/core';
import { MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { CanyaEvent } from '../../data/CanyaEvent';

class Canya {}

@Component({
  selector: 'app-canya-summary',
  imports: [MatListItem, MatIcon],
  templateUrl: './canya-summary.html',
  styleUrl: './canya-summary.scss',
})
export class CanyaSummary {
  canya = input.required<CanyaEvent>();
}
