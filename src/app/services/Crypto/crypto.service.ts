import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crypto } from 'src/app/models/crypto';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private _api_url : string = 'https://api.coincap.io/v2/assets';
  private _cryptos : Crypto [] = [];

  constructor(private _httpClient : HttpClient) { 

    this.retrieveCryptos();
  }

  retrieveCryptos () {
    this._httpClient.get(this._api_url).subscribe({
      next: (data : any) => {
        const getData = data.data;
        this._cryptos = [...getData];
      }
    })
  }

  getCryptos () {
    return this._cryptos;
  }

}
