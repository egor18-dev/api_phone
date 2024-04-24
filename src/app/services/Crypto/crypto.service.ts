import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crypto } from 'src/app/models/crypto';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private _start: number = 0;
  private _maxActual : number = 25;
  private _max: number = 100;
  private _api_url: string = 'https://api.coincap.io/v2/assets';
  private _cryptos: Crypto[] = [];


  constructor(private _httpClient: HttpClient) {
  }

  retrieveCryptos() {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${this._api_url}?offset=${this._start}&&limit=${this._maxActual}`).subscribe({
        next: (data: any) => {
          resolve(data);
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }

  getStart() {
    return this._start;
  }

  setStart (start : number) {
    this._start = start;
  }

  getMaxActual(){
    return this._maxActual;
  }

  setMaxActual(maxActual : number) {
    this._maxActual = maxActual;
  }

  getMax () {
    return this._max;
  }

  setMax(max : number){
    this._max = max;
  }

}
