import { Component } from '@angular/core';
import { CryptoService } from '../services/Crypto/crypto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private _cryptoService : CryptoService) {}

  getCryptos () {
    return this._cryptoService.getCryptos();
  }

  getCryptoColor (cryptoValue : any) {
    return Number(cryptoValue) > 0 ? '#25b331' : '#e41010';
  }
}
