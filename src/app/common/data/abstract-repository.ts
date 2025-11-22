import { IAppEntity } from './i-app-entity';
import { inject } from '@angular/core';
import {
  collection,
  collectionSnapshots,
  doc,
  docSnapshots,
  documentId,
  Firestore,
  FirestoreDataConverter,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import {
  convertDateTimeToDate,
  convertTimestampsToDates,
} from './conversion-utils';

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

    console.log(`The transformed interface inc dates`, data);

    await setDoc(ref, data);
    return { ...data, id: docId } as T;
  }

  watchDocument(id: string): Observable<T | null> {
    const path = `${this.collectionName}/${id}`;
    const docRef = doc(this.firestore, path).withConverter(this.converter);
    const docSnapshots$ = docSnapshots(docRef);
    return docSnapshots$.pipe(
      map((snapshot) => {
        return snapshot.exists() ? (snapshot.data() as T) : null;
      }),
    );
  }

  watchDocumentsInList(docIds: string[] = []) {
    const maxIDs = 10;

    const uniqueIds = Array.from(new Set(docIds));
    if (uniqueIds.length > maxIDs)
      throw new Error(
        `Can only query for a maximum of ${maxIDs} using tne IN operator`,
      );

    const docs$ = this.watchCollection([where(documentId(), 'in', uniqueIds)]);
    // docs$.pipe(tap((docs) => console.log(`Found some docs`, docs))).subscribe();
    return docs$;
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
      return convertDateTimeToDate(rest);
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
