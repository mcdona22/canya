import { IAppEntity } from './i-app-entity';
import { inject } from '@angular/core';
import {
  collection,
  collectionSnapshots,
  doc,
  Firestore,
  FirestoreDataConverter,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  setDoc,
  Timestamp,
} from '@angular/fire/firestore';
import { map } from 'rxjs';
import { DateTime } from 'luxon';

function convertTimestampsToDates(data: any): any {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  // 🚨 Direct type check using instanceof
  if (data instanceof Timestamp) {
    return DateTime.fromMillis(data.toMillis());
  }

  if (Array.isArray(data)) {
    // If it's an array, map over its elements and recurse
    return data.map(convertTimestampsToDates);
  }

  // If it's a plain object, iterate over keys and recurse
  const processedData: Record<string, any> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      processedData[key] = convertTimestampsToDates(data[key]);
    }
  }
  return processedData;
}

export type EntityType = 'canya-events' | 'app-users';

export class AbstractRepository<T extends IAppEntity> {
  protected constructor(public collectionName: EntityType) {}

  firestore = inject(Firestore);

  watchCollection(constraints: QueryConstraint[] = []) {
    const docCollection = collection(
      this.firestore,
      this.collectionName,
    ).withConverter(this.converter);

    const q = query(docCollection, ...constraints);
    const querySnapshots$ = collectionSnapshots(q);
    return querySnapshots$.pipe(
      map((data) => data.map((doc) => doc.data() as T)),
    );
  }

  async writeDocument(document: IAppEntity) {
    const docId = document.id || this.generateId();
    const docCollection = collection(this.firestore, this.collectionName);
    const ref = doc(docCollection, docId);
    const data = this.converter.toFirestore(document as T);

    await setDoc(ref, data);
    return { ...data, id: docId } as T;
  }

  /**
   *
   * @private converter
   * handles mapping between firebase and app entities
   *
   * toFirestore
   *  - removes the id before its pushed to the datastore
   */
  private converter: FirestoreDataConverter<IAppEntity> = {
    toFirestore(doc: T) {
      const { id, ...rest } = doc;
      return rest;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot) {
      const data = snapshot.data();
      if (!data) {
        throw new Error('Document data is undefined');
      }
      const fetchedData: any = { ...data, id: snapshot.id };
      console.log(`converting dates`);
      // for (const key in fetchedData) {
      //   if (fetchedData[key] instanceof Timestamp) {
      //     const timestamp = fetchedData[key] as Timestamp;
      //     fetchedData[key] = new Date(timestamp.toMillis());
      //   }
      // }
      const convertedData = convertTimestampsToDates(fetchedData);
      return convertedData as T;
    },
  };

  generateId(): string {
    const collectionRef = collection(this.firestore, this.collectionName);
    return doc(collectionRef).id;
  }
}
