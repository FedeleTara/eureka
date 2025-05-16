import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { Quote } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  readonly #collectionQuotes = "quotes";

  #firestore = inject(Firestore);

  // PUT - add/replace a quote
  async putQuote(data: Partial<Quote>) {
    const quotes = collection(this.#firestore, this.#collectionQuotes);
    await addDoc(quotes, data);
  }

  // GET - resolve all the quotes
  getQuotes() {
    // const quotes = collection(this.#firestore, this.#collectionQuotes);
    // return collectionData(quotes, { idField: 'id' }) as Observable<Quote[]>;

    const quotes = collection(this.#firestore, this.#collectionQuotes);
    const querie = query(quotes, orderBy('date_creation', 'desc'));
    return collectionData(querie, { idField: 'id' }) as Observable<Quote[]>;
  }
}
