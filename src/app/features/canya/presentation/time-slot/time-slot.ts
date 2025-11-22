import { Component, input } from '@angular/core';
import { IDateSlot } from '../../data/i-canya-event';

@Component({
  selector: 'app-time-slot',
  imports: [],
  templateUrl: './time-slot.html',
  styleUrl: './time-slot.scss',
})
export class TimeSlot {
  slot = input.required<IDateSlot>();
}
