import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencies(){
    return this.http.get('https://api.vatcomply.com/rates');
  }

  getCurrency(curr:string){
    return this.http.get('https://api.vatcomply.com/rates?base='+curr);
  }
}
