import { IAppEntity } from '../../../common/data/i-app-entity';

export interface AppUser extends IAppEntity {
  // id?: string;
  email: string;
  displayName: string;
  photoURL: string;
}
