import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  public getCurrencies(): Observable<any> {
    const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=100';
    return this.http.get(url);
  }

  public getCurrency(currencyId: string): Observable<any> {
    const url = `https://api.coinmarketcap.com/v1/ticker/${currencyId}/`;
    return this.http.get(url).pipe(
      map((result: Array<Object>) => result.length === 1 ? result[0] : result)
    );
  }
}
