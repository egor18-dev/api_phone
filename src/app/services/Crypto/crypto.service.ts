import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crypto } from 'src/app/models/crypto';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private limit: number = 20;
  private max: number = 100;
  private _api_url: string = 'https://api.coincap.io/v2/assets';
  private _cryptos: Crypto[] = [];


  constructor(private _httpClient: HttpClient) {
  }

  retrieveCryptos() {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${this._api_url}?limit=${this.limit}`).subscribe({
        next: (data: any) => {
          resolve(data);
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }

}
