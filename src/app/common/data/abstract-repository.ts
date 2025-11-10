import { IAppEntity } from './i-app-entity';
import { inject } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  setDoc,
} from '@angular/fire/firestore';

export type EntityType = 'events' | 'app-users';

export class AbstractRepository<T extends IAppEntity> {
  protected constructor(public collectionName: EntityType) {}

  firestore = inject(Firestore);

  async writeDocument(document: IAppEntity) {
    const docCollection = collection(this.firestore, this.collectionName);
    const ref = doc(docCollection, document.id);
    const data = this.converter.toFirestore(document as T);

    const response = await setDoc(ref, data);
    console.log(`Response`, response);
  }

  private converter: FirestoreDataConverter<IAppEntity> = {
    toFirestore(doc: IAppEntity) {
      const { id, ...rest } = doc;
      return rest;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot) {
      const data = snapshot.data();
      if (!data) {
        throw new Error('Document data is undefined');
      }
      const fetchedData: any = { ...data, id: snapshot.id };
      return fetchedData as T;
    },
  };
}
