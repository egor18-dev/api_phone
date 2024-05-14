import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crypto } from 'src/app/models/crypto';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private _start: number = 0;
  private _maxActual: number = 25;
  private _max: number = 100;
  private _api_url: string = 'https://api.coincap.io/v2/assets';
  private _calls: number = 0;
  private _cryptos: Crypto[] = [];
  private _actualCrypto !: Crypto;

  /*
    He evitat retornar promeses i torno els valos en getters directament,
    aquest si que l'he pogut provar directament al ordenador.
  */

  constructor(private _httpClient: HttpClient) {
    this.retrieveCryptos();
  }

  retrieveCryptos() {
    if (this._calls > 0) {
      this._start = this._maxActual + 1;
      this._maxActual += 10;
    }

    this._calls++;

    this._httpClient
      .get(`${this._api_url}?offset=${this._start}&&limit=${this._maxActual}`)
      .subscribe({
        next: (data: any) => {
          this._cryptos = data.data;
        },
        error: (err: any) => {
          console.log(`Error al rebre les cryptos ${err}`);
        },
      });
  }

  retrieveCrypto(cryptoId: string) {
      this._httpClient.get(`${this._api_url}/${cryptoId}`).subscribe({
        next: (data: any) => {
          this._actualCrypto = data.data;
        },
        error: (err: any) => {
          console.log(`Error al rebre la crypto ${err}`);
        },
    });
  }

  getCryptos () {
    return this._cryptos;
  }

  getStart() {
    return this._start;
  }

  setStart(start: number) {
    this._start = start;
  }

  getMaxActual() {
    return this._maxActual;
  }

  setMaxActual(maxActual: number) {
    this._maxActual = maxActual;
  }

  getMax() {
    return this._max;
  }

  setMax(max: number) {
    this._max = max;
  }

  getActualCrypto () {
    return this._actualCrypto;
  }
}
