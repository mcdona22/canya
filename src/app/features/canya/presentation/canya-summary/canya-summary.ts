import { Component, input } from '@angular/core';
import { MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { CanyaEvent } from '../../data/CanyaEvent';
import { DatePipe, JsonPipe } from '@angular/common';

class Canya {}

@Component({
  selector: 'app-canya-summary',
  imports: [MatListItem, MatIcon, DatePipe, JsonPipe],
  templateUrl: './canya-summary.html',
  styleUrl: './canya-summary.scss',
})
export class CanyaSummary {
  canya = input.required<CanyaEvent>();
}
