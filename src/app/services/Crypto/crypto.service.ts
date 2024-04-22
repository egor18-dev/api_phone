import { Injectable } from '@angular/core';
import { Crypto } from 'src/app/models/crypto';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private _api_url : string = 'api.coincap.io/v2/assets';
  private _cryptos : Crypto [] = [];

  constructor() { }

  retrieveCryptos () {

  }

}
