import { inject, Injectable } from '@angular/core';
import { AppUser } from './app-user';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

const collectionName = 'app-users';

@Injectable({
  providedIn: 'root',
})
export class AppUserRepository {
  firestore = inject(Firestore);

  async writeDocument(document: AppUser) {
    const docCollection = collection(this.firestore, collectionName);
    const ref = doc(docCollection, document.id);
    const response = await setDoc(ref, document);
    console.log(`Response`, response);
  }
}
