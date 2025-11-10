import { Injectable } from '@angular/core';
import { AbstractRepository } from '../../../common/data/abstract-repository';
import { AppUser } from './app-user';

// const collectionName = 'app-users';

@Injectable({
  providedIn: 'root',
})
export class AppUserRepository extends AbstractRepository<AppUser> {
  constructor() {
    super('app-users');
  }

  // firestore = inject(Firestore);
  //
  // async writeDocument(document: IAppEntity) {
  //   const docCollection = collection(this.firestore, collectionName);
  //   const ref = doc(docCollection, document.id);
  //   const data = this.converter.toFirestore(document as IAppEntity);
  //
  //   const response = await setDoc(ref, data);
  //   console.log(`Response`, response);
  // }

  // private converter: FirestoreDataConverter<IAppEntity> = {
  //   toFirestore(doc: IAppEntity) {
  //     const { id, ...rest } = doc;
  //     return rest;
  //   },
  //   fromFirestore(snapshot: QueryDocumentSnapshot) {
  //     const data = snapshot.data();
  //     if (!data) {
  //       throw new Error('Document data is undefined');
  //     }
  //     const fetchedData: any = { ...data, id: snapshot.id };
  //     return fetchedData as IAppEntity;
  //   },
  // };
}
