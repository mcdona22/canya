import { IAppEntity } from '../../../common/data/i-app-entity';

export interface IDateSlot {
  selectedDate: Date;
  comment: string;
}

export interface ICanyaEvent extends IAppEntity {
  ownerId: string;
  name: string;
  description: string;
  slots: IDateSlot[];
}
