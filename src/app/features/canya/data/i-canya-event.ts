import { IAppEntity } from '../../../common/data/i-app-entity';
import { DateTime } from 'luxon';

export interface IDateSlot {
  selectedDate: DateTime;
  comment: string;
}

export interface ICanyaEvent extends IAppEntity {
  ownerId: string;
  name: string;
  description: string;
  slots: IDateSlot[];
}
