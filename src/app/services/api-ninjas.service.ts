import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuoteGenerated } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiNinjasService {
  readonly headers = new HttpHeaders({'X-Api-Key': 'R2q01//R2QAfS4rUHux7Ag==E3zWxKxJREp4IkE5'});

  #http = inject(HttpClient);

  getRandomQuote(): Observable<QuoteGenerated[]> {
    const api_url ="https://api.api-ninjas.com/v1/quotes";
    return this.#http.get<QuoteGenerated[]>(api_url, { headers: this.headers });
  }
}
