import { ICanyaEvent, IDateSlot } from './i-canya-event';
import { DateTime } from 'luxon';

export class CanyaEvent implements ICanyaEvent {
  id?: string;
  ownerId: string;
  name: string;
  description: string;
  slots: IDateSlot[];

  constructor(ce: ICanyaEvent) {
    this.id = ce.id;
    this.ownerId = ce.ownerId;
    this.name = ce.name;
    this.description = ce.description;
    this.slots = ce.slots;
  }

  findEarliestSlot(): DateTime | undefined {
    if (this.slots.length == 0) return undefined;
    console.log(`We have some slots for ${this.name} - lets reduce`, this);
    const earliestSlot = this.slots.reduce((earliest, current) => {
      if (current.selectedDate.toMillis() < earliest.selectedDate.toMillis()) {
        return current;
      }
      return earliest;
    });
    return earliestSlot.selectedDate;
  }

  toString(): string {
    return JSON.stringify(this);
  }

  canyaUsers(): string[] {
    return [this.ownerId];
  }
}
